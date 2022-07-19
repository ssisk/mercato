import express from "express";
import request from "supertest";
import { getCombinedApp } from "./combined_apps";
import { MercatoEnv } from "./shared";

const mercatoLockedDownCSP =
  `child-src 'self';connect-src 'self' abc.com;default-src 'self';font-src 'self';frame-src 'self';img-src 'self';manifest-src 'self';media-src 'self';object-src 'none';prefetch-src 'self';script-src 'self';script-src-elem 'self';script-src-attr 'self';style-src 'self';style-src-elem 'self';style-src-attr 'self';worker-src 'self';wrong-val-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self'`;
// https://stackoverflow.com/questions/48033841/test-process-env-with-jest
// This file relies on jest.config's setupFiles setting which invokes setEnvVars.js

describe("Mercato", function() {
  it("will create a user and set a cookie", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent.host("example.com")
      .post("/user/create")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ serverUrl: "abc.com" }));
    expect(response.status).toEqual(200);
    const cookie = (response.headers["set-cookie"])[0];
    console.log("cookie", cookie);
    expect(cookie).toContain("Domain=.example.com");
    expect(cookie).toContain("mercatoUser=");
  });

  it("will validate a user and set a proper cookie", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent.host("example.com")
      .post("/user/validate")
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          mercatoToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmODNhMWYzMS04MTBmLTQzZDYtOGVlMi01NzFiMjM2YjI3ZTMiLCJzZXJ2ZXJVcmwiOiJhYmMuY29tIiwiaWF0IjoxNjU4MTA5NjQwLCJpc3MiOiJleGFtcGxlLmNvbSJ9.rwjG-KsaUCDqncG6A_MNERvm6ZZmxVHZb1Xv-kJpeIs",
        }),
      );
    expect(response.status).toEqual(200);
    const cookie = (response.headers["set-cookie"])[0];
    expect(cookie).toContain("Domain=.example.com");
    expect(cookie).toContain("mercatoUser=");
  });

  it("will respond with http error code and not set a cookie if asked to validate a user with an invalid token", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent.host("example.com")
      .post("/user/validate")
      .set("Content-Type", "application/json")
      .send(
        JSON.stringify({
          mercatoToken: "NopeNotAToken",
        }),
      );
    expect(response.status).toEqual(400);
    const cookie = (response.headers["set-cookie"]);
    expect(cookie).toBeUndefined();
  });

  it("will serve a file with correct CSP header when given a valid cookie", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent
      .host("example.example.com")
      .get("/")
      .set("Cookie", [
        "mercatoUser=s%3A%7B%22userId%22%3A%2225072d9b-3a3e-45a0-944f-3fcd7c9ee16a%22%2C%22serverUrl%22%3A%22abc.com%22%7D.dw6zifZdiJxAr%2BTG2xcJYjrgve5jrI9qdDB34NcrZbw;",
      ]);
    const cspHeader = (response.headers["content-security-policy"]);
    expect(cspHeader).toEqual(
      mercatoLockedDownCSP,
    );
  });

  it("will redirect to login when given an invalid cookie", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent
      .host("example.example.com")
      .get("/")
      .set("Cookie", [
        "mercatoUser=nopeImNotAValidCookie;",
      ]);
    expect(response.status).toEqual(302);
    expect(response.headers.location).toContain("/login");
  });

  it("will return 404 WITH CSP HEADER if a file is not found", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent
      .host("example.example.com")
      .get("/not-a-file.txt")
      .set("Cookie", [
        "mercatoUser=s%3A%7B%22userId%22%3A%2225072d9b-3a3e-45a0-944f-3fcd7c9ee16a%22%2C%22serverUrl%22%3A%22abc.com%22%7D.dw6zifZdiJxAr%2BTG2xcJYjrgve5jrI9qdDB34NcrZbw;",
      ]);
    const cspHeader = (response.headers["content-security-policy"]);
    expect(cspHeader).toEqual(mercatoLockedDownCSP);
    expect(response.status).toEqual(404);
  });

  it("will return an error http code WITH CSP if given an invalid app domain name", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent
      .host("notAnApp.example.com")
      .get("/")
      .set("Cookie", [
        "mercatoUser=s%3A%7B%22userId%22%3A%2225072d9b-3a3e-45a0-944f-3fcd7c9ee16a%22%2C%22serverUrl%22%3A%22abc.com%22%7D.dw6zifZdiJxAr%2BTG2xcJYjrgve5jrI9qdDB34NcrZbw;",
      ]);
    const cspHeader = (response.headers["content-security-policy"]);
    expect(cspHeader).toEqual(
      mercatoLockedDownCSP,
    );
    expect(response.status).toEqual(404);
  });
  it("will return 500 WITH CSP if an exception is thrown", async () => {
    const app = express();
    const fullApp = await getCombinedApp(app, MercatoEnv.Prod);
    const agent = request.agent(fullApp);

    const response = await agent
      .host("throwerrorplz.example.com")
      .get("/")
      .set("Cookie", [
        "mercatoUser=s%3A%7B%22userId%22%3A%2225072d9b-3a3e-45a0-944f-3fcd7c9ee16a%22%2C%22serverUrl%22%3A%22abc.com%22%7D.dw6zifZdiJxAr%2BTG2xcJYjrgve5jrI9qdDB34NcrZbw;",
      ]);
    const cspHeader = (response.headers["content-security-policy"]);
    expect(cspHeader).toEqual("default-src 'none'");
    expect(response.status).toEqual(500);
  });
});
