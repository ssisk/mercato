import express, { ErrorRequestHandler } from "express";
import proxy from "express-http-proxy";

const startProxy = async () => {
  const proxyApp = express();
  proxyApp.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    // "Access-Control-Allow-Methods": "POST, OPTIONS",
    // "Access-Control-Allow-Headers": "Content-Type",
    //  res.setHeader('', 'utf-8')
    next();
  });
  proxyApp.use(
    "/",
    proxy("127.0.0.1:8000", {
      filter: (req, res) => {
        console.log("filter", req.path);
        console.log("headers", req.headers);
        return true;
      },
      userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        // console.log("user req: ", userReq);
        if (userReq.originalUrl.startsWith("/.well-known/webfinger")) {
          // const json = JSON.parse(proxyResData.toString('utf8'));
          // TODO: obviously this should not be hardcoded
          throw new Error("hardcoding this caused too many issues!");
          return `{
          "links": [
            {
              "href": "http://localhost:3050/storage/testuser2",
              "rel": "remotestorage",
              "type": "draft-dejong-remotestorage-01",
              "properties": {
                "auth-method": "http://tools.ietf.org/html/rfc6749#section-4.2",
                "auth-endpoint": "http://localhost:3050/oauth/testuser2" ${
            console.error("FIX THIS! note that username is in this line!")
          },
                "http://remotestorage.io/spec/version": "draft-dejong-remotestorage-01",
                "http://tools.ietf.org/html/rfc6750#section-2.3": true,
                "http://tools.ietf.org/html/rfc6749#section-4.2": "http://localhost:3050/oauth/testuser2"
              }
            }
          ]
        }`;
        }
        return proxyResData;
      },
    }),
  );
  // const rsHost = "http://127.0.0.1:8000";
  // app.get("/proxy/*", (req, res, next) => {
  //   const newPath = rsHost + req.originalUrl.slice(6); // + req.params;
  //   // console.log(req.originalUrl);
  //   // so apparently localhost doesn't work, but 127.0.0.1 does???
  //   // const newPath = "http://127.0.0.1:8000/.well-known/webfinger?resource=acct:testuser@localhost:8000";
  //   // const newPath = "http://localhost:3030/code/helloRS/index.html";
  //   console.log("path", newPath);
  //   const r = fetch(newPath); // , {headers: req.headers}
  //   r.then(r => {
  //     r.text().then(t => {
  //       console.log(t);
  //       res.status(200).send(t);
  //     });
  //   });
  //   // res.status(200).send("hi there");
  //   // , { method: "GET" }
  // });
  const port = 3050;

  proxyApp.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });
};

startProxy().catch(console.log);
