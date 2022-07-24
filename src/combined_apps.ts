import { Express } from "express";
import vhost from "vhost";
import { prodUrl } from "./environment";
import { getAppFilesServer } from "./files_server";
import { domainNames, MercatoEnv } from "./shared";
import { getStoreServer } from "./store_server";

export const getCombinedApp = async (app: Express, mercEnv: MercatoEnv) => {
  const filesApp = await getAppFilesServer(mercEnv);
  const storeApp = await getStoreServer(mercEnv);

  const stripPorts = (s: string) => s.split(":")[0];
  app.use(vhost("www." + stripPorts(domainNames[mercEnv]), storeApp));
  app.use(vhost("*." + stripPorts(domainNames[mercEnv]), filesApp));
  app.use(vhost(stripPorts(domainNames[mercEnv]), storeApp));
  app.get("*", (req, res) => {
    console.error(
      "combinedApp: the request was not handled by one of the apps. current domain name:",
      domainNames[mercEnv],
      "env:",
      mercEnv,
      "prod_url:",
      prodUrl,
    );
    res.status(404).send("This is not a valid domain for this server").end();
  });
  return app;
};
