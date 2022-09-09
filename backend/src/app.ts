import express from "express";
import { PORT } from "./config";
import morgan from "morgan";
import { errorHandler } from "./core/middlewares/error-handler.middleware";

// Routes
import clientsRoute from "./routes/clients.route";
import paymentsRoute from "./routes/payments.route";
import administratorsRoute from "./routes/administrators.route";

export class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.handlers();
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
    this.app.use("/administrators", administratorsRoute);
  }

  handlers() {
    this.app.use(errorHandler);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}
