import express from "express";

class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
  }

  settings() {
    this.app.set("port", 8000);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

export default Application;
