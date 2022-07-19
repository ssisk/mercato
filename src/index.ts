import express, { Express } from "express";
import { getCombinedApp } from "./combined_apps";
import { MercatoEnv } from "./shared";

const start = async () => {
  const app = express();
  const mercEnv = app.get("env") == "development" ? MercatoEnv.Dev : MercatoEnv.Prod;
  const fullApp = await getCombinedApp(app, mercEnv);

  const port = 3000;

  fullApp.listen(port, () => {
    console.log(`Mercato server is up on ${port}`);
  });
};

start().catch(console.error);
