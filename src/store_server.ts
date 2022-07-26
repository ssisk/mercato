import cookieParser from "cookie-parser";
import cors from "cors";
import { randomUUID } from "crypto";
import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { cookieSecret, jwtSecret } from "./environment";
import {
  cookieName,
  domainNames,
  mercatoApps,
  MercatoCookie,
  MercatoEnv,
  mercPaths,
  sharedErrorHandler_CSPAware,
} from "./shared";

const curFilename = path.basename(__filename);
const curDirname = path.dirname(curFilename);

export const getStoreServer = async (mercEnv: MercatoEnv) => {
  const isDevEnv = mercEnv == MercatoEnv.Dev;
  const cookieDomain = domainNames[mercEnv].split(":")[0];
  const jwtIssuer = domainNames[mercEnv];
  const app = express();
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");
  app.use(express.static(path.join(__dirname, "app_store_public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser(cookieSecret));
  app.use(
    isDevEnv ? cors() /* allow any domain */ : cors({ origin: domainNames[mercEnv] }),
  );

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/listing", (req, res) => {
    res.render("app_listing", { mercatoApps: mercatoApps(mercEnv) });
  });

  app.get("/", (req, res) => {
    res.render("home", {});
  });

  const getPayload = (userId: string, serverUrl: string): MercatoCookie => {
    return { userId, serverUrl };
  };

  const createUser = async (): Promise<string> => {
    // right now we're not storing any data server side
    // everything is retained in the token set as a cookie in the
    // user's browsers and stored in the user's RS account
    return Promise.resolve(randomUUID());
  };

  app.post("/user/create", async (req, res) => {
    const serverUrl = req.body.serverUrl;
    if (!serverUrl) {
      res.status(400).send("must include serverUrl");
      return;
    }
    const userId = await createUser();

    const payload = getPayload(userId, serverUrl);
    console.log("creating token: ", payload);
    const token = jwt.sign(payload, jwtSecret, {
      algorithm: "HS256",
      // expiresIn: "60 days",
      // We don't want the token to expire since we don't store any data about users
      // server side
      issuer: jwtIssuer,
      // jwtid could be added to support revoking of token
    });

    setCookie(res, payload);
    // we send the token to the client so the client can store the
    // token in RS. Then when the user is on a new machine, the mercato client can read the
    // token from RS, then the client can send the token to the
    // server and the server can set the mercato cookie
    // so the file server knows which user it is.
    return res.send({ success: true, token }).end();
  });

  const setCookie = (res: Response, payload: MercatoCookie) => {
    console.log("cookie being set:", payload);
    res.cookie(cookieName, JSON.stringify(payload), {
      signed: true, // will be signed using the secret passed to the cookie middlware
      // I don't think httpOnly is strictly necessary, but I think it's a good
      // habit to be in for auth cookies
      httpOnly: true, // not visible to client JS
      secure: mercEnv == "prod", // only send the cookie over https connections
      domain: cookieDomain,
    });
  };

  // this is called when:
  // a user is not logged in (aka does not have the mercato cookie set)
  // AND they have a mercato token set in their RS mercato scope
  app.post("/user/validate", (req, res) => {
    const token = req.body.mercatoToken as string;
    let payload;
    try {
      // it isn't actually necessary to do this, but I think it's a good opportunity
      // to validate that the token we're using is understood by this server.
      // It helps us throw an error message to the user when they are first
      // connecting to mercato on a given machine, rather than when the user
      // tries to access app files using the cookie
      payload = jwt.verify(token, jwtSecret, {
        issuer: jwtIssuer,
      }) as any;
      if (!payload) throw new Error("no value returned for payload!");
    } catch (e) {
      console.error("JWT error: " + e);
      res.status(400).send("could not validate that token").end();
      return;
    }

    console.log("Token validated, setting cookie on browser");
    // don't use the full payload from jwt.verify since it includes other data
    setCookie(res, { serverUrl: payload.serverUrl, userId: payload.userId });
    res.status(200).send({ success: true }).end();
  });

  app.use((req, res, next) => {
    const cookieVal = req.signedCookies[cookieName];
    if (!cookieVal) {
      console.log("User did not have mercato cookie, redirecting to login");
      res.redirect(mercPaths.login);
      return;
    }
    next();
  });
  /* everything below here can only be done by a validated user */

  app.get(mercPaths.logout, (req, res) => {
    console.log("Logging out user");
    res.clearCookie(cookieName, { domain: cookieDomain, path: "/" });
    res.render("logout");
  });

  app.use(sharedErrorHandler_CSPAware);

  return app;
};
