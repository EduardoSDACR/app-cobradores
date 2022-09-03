import express from "express";
import { PORT } from "./config";
import morgan from "morgan";

// Routes
import clientsRoute from "./routes/clients";
import paymentsRoute from "./routes/payments";

export class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", PORT);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use("/clients", clientsRoute);
    this.app.use("/payments", paymentsRoute);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}
