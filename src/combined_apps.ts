import { Express } from "express";
import vhost from "vhost";
import { getAppFilesServer } from "./files_server";
import { domainNames, MercatoEnv } from "./shared";
import { getStoreServer } from "./store_server";

export const getCombinedApp = async (app: Express, mercEnv: MercatoEnv) => {
  const filesApp = await getAppFilesServer(mercEnv);
  const storeApp = await getStoreServer(mercEnv);

  const stripPorts = (s: string) => s.split(":")[0];
  app.use(vhost("*." + stripPorts(domainNames[mercEnv]), filesApp));
  app.use(vhost(stripPorts(domainNames[mercEnv]), storeApp));
  return app;
};
