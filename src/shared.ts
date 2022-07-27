import { ErrorHandler } from "express-async-router";
import path from "path";
import { prodUrl } from "./environment";

export const cookieName = "mercatoUser";

export enum MercatoEnv {
  Prod = "prod",
  Dev = "dev",
}

export const domainNames: Record<MercatoEnv, string> = {
  dev: "mercato-dev.run:8080",
  prod: prodUrl,
};

export const getScheme = (env: MercatoEnv) => {
  return env == "prod" ? "https://" : "http://";
};

export const mercPaths = {
  store: "/store",
  login: "/login",
  logout: "/logout",
};

export const getAppDomainName = (appName: string, env: MercatoEnv) => {
  // before we generate any domain names, make sure that
  // they can't be manipulated in weird ways (they might
  // be user input at some point, eg when a dev names their app)
  appName = appName.toLowerCase();
  if (!appName.match(/[(a-zA-Z)]+/)) {
    throw new Error("invalid appname: '" + appName + "'");
  }
  return `${getScheme(env)}${appName}.${domainNames[env]}`;
};

export const getUrl = (env: MercatoEnv, domainName: string, path: string) => {
  return getScheme(env) + domainName + path;
};

export interface MercatoCookie {
  userId: string;
  serverUrl: string; // should be scheme + domain name: "https://files.nooq.run"
}

export const mercatoAppDir = path.resolve(__dirname, "apps");

export interface UrlOverride {
  urlPath: string; // relative path of the url that the mercato receives
  filePath: string; // relative path of the file to be returned
  // headers: Record<string, string>; not currently needed, but if you needed to specify the content-type, this'd be handy for that.
  //   You shouldn't need content-type, since sendFile determines the content-type from the file extension of filePath
}

export interface App {
  name: string;
  currentVersion: string;
  url: string;
  overrides?: UrlOverride[];
}

export const mercatoApps: (env: MercatoEnv) => App[] = (env) =>
  [
    { name: "example", currentVersion: "1" },
    {
      name: "inspektor",
      currentVersion: "1",
      overrides: [
        { urlPath: "/connect", filePath: "/index.html" },
        { urlPath: "/inspect", filePath: "/index.html" },
      ],
    },
  ].map(a => ({ ...a, url: getAppDomainName(a.name, env) }));

export const sharedErrorHandler_CSPAware: ErrorHandler = (err, req, res, next) => {
  console.error("Error handler saw this error:", err.stack);
  // SECURITY: we want to ensure that CSP is still set
  // despite errors being thrown/etc
  res.setHeader("Content-Security-Policy", "default-src 'none'");
  res.status(500)
    .send("There was an internal server error while handling your request. Please try again.")
    .end();
};
