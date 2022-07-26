import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, Request } from "express";
import helmet from "helmet";
import path from "path";
import { cookieSecret } from "./environment";
import {
  App,
  cookieName,
  domainNames,
  getUrl,
  mercatoAppDir,
  mercatoApps,
  MercatoEnv,
  mercPaths,
  sharedErrorHandler_CSPAware,
} from "./shared";

const curFilename = path.basename(__filename);
const curDirname = path.dirname(curFilename);

const UnsafeInlineVal = "'unsafe-inline'";
const SelfVal = `'self'`;
const NoneVal = "'none'";

export const getAppFilesServer = async (mercEnv: MercatoEnv) => {
  const app = express();

  ///////// Middleware injection ////////////////
  app.use(express.json());
  app.use(cookieParser(cookieSecret));

  // Notes on app.use(helmet()) location:
  // https://stackoverflow.com/questions/66968831/does-it-matter-where-i-place-app-usehelmet-within-the-app-use-statements
  const getHelmet = (rsServerUrl: string) => {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          "child-src": [SelfVal], // MDN docs are confusing, see https://github.com/w3c/webappsec-csp/issues/299
          // I'm leaving child-src in since it doesn't hurt anything
          "connect-src": [SelfVal, rsServerUrl],
          "default-src": [SelfVal],
          // Consider allowing for fonts loaded
          // using "data:"? Needs investigation
          // to understand security risk
          "font-src": [SelfVal], // , "data:"
          "frame-src": [SelfVal],
          "img-src": [SelfVal],
          "manifest-src": [SelfVal],
          "media-src": [SelfVal],
          "object-src": [NoneVal],
          "prefetch-src": [SelfVal],
          "script-src": [SelfVal],
          "script-src-elem": [SelfVal],
          "script-src-attr": [SelfVal],
          "style-src": [SelfVal],
          /* right now, allowing inline RS widget uses this */
          "style-src-elem": [SelfVal, UnsafeInlineVal],
          "style-src-attr": [SelfVal, UnsafeInlineVal],
          "worker-src": [SelfVal],

          // document directives
          "base-uri": [SelfVal],
          "sandbox": null, // we are not using this directive

          // Navigation directives
          "form-action": [SelfVal],
          "frame-ancestors": [SelfVal],
          "navigate-to": null, // This means navigation anywhere is allowed
          // TODO: consider only allow navigation by having navigate-to
          // set to a redirect domain controlled by us

          // Reporting directives
          /* todo: this would be handy to see
          "report-uri": [SelfVal],
          "report-to": [SelfVal],
          */

          // Other
        },
      },
    });
  };

  // this middleware validates that the user is signed in to mercato
  app.use((req, res, next) => {
    const redirectWithError = (msg: string) => {
      console.error(msg);
      res.redirect(getUrl(mercEnv, domainNames[mercEnv], mercPaths.login));
    };
    const rawMercatoCookie = req.signedCookies[cookieName] as string;
    if (!rawMercatoCookie) {
      redirectWithError("User did not a have signed mercato cookie");
      return;
    }
    const rsServerUrl = JSON.parse(rawMercatoCookie).serverUrl;
    if (!rsServerUrl) {
      console.error("Invalid mercato cookie, missing rsServerUrl", rawMercatoCookie);
      res.redirect(getUrl(mercEnv, domainNames[mercEnv], mercPaths.login));
      return;
    }
    // invoke the helmet middleware for this request
    getHelmet(rsServerUrl)(req, res, next);
  });

  const getAppFromHost = (req: Request): App | undefined => {
    // TODO: when processing these, be aware that hostname is
    // controlled by the user
    const requestedAppName = req.hostname.split(".").slice(0, 1)[0];
    if (requestedAppName == "throwerrorplz" && process.env.IS_TEST) {
      throw new Error("Throwing error as per test request");
    }
    // We use an allow list of app names to ensure
    const app = mercatoApps(mercEnv).find(a => a.name == requestedAppName);
    if (!app) {
      console.error("unknown appName: " + requestedAppName + " from request hostname: " + req.hostname);
    }
    return app;
  };

  // this is the main endpoint for retrieving app files
  app.get("*", (req, res, next) => {
    // SECURITY: note that asset path is controlled by the user so
    // we cannot trust it
    const assetPath = req.path == "/" ? "./index.html" : req.path;
    const app = getAppFromHost(req);
    // SECURITY: note that appBaseDir is used as the root by sendFile.
    // We should never allow the user to control any part of this path.
    // Currently, the app name and version are only retrieved from
    // an allow list of apps, so it's safe
    if (!app) {
      console.error("User tried to access unknown app");
      res.status(404)
        .send("That is not an app on this Mercato server")
        .end();
      return;
    }
    const appBaseDir = path.resolve(mercatoAppDir, app.name, app.currentVersion);
    res.set("Cache-control", "public, max-age=31536000");
    try {
      // SECURITY: here we pass off responsibility to sendFile. It must make sure
      // the file being retrieved is inside of appBaseDir.
      res.sendFile(assetPath, { root: appBaseDir }, (e) => {
        if (e) {
          console.error("There was an error when sending file!");
          console.error("error was: ", e);
          res.status(404).end();
        } else {
          console.log("successful send! of", assetPath);
        }
      });
    } catch (e: any) {
      console.error(e.message);
      throw new Error("Error during file server sendFile. Path was: " + req.path + ". App was: " + JSON.stringify(app));
    }
  });
  app.use(sharedErrorHandler_CSPAware);

  return app;
};
// anything below here is likely an error - we should make sure
// to set CSP and not echo anything the user sent us as part of the
// request
