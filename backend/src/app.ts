import express from "express";
import { PORT } from "./config";

export class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
  }

  settings() {
    this.app.set("port", PORT);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}
