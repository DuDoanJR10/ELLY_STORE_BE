import express, { Application } from "express";
import config from "./common/configs/config";
import cors from "cors";
import db from "../db/connection";
import router from "./routes";

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database connected");

      await db.sync({ alter: true });
      console.log("Database synchronized");
    } catch (error: any) {
      console.error(error, "Error connecting to DB");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    router(this.app);
  }

  listen() {
    this.app.listen(config.port, () => {
      console.log(
        `Server up and running at port: http://localhost:${config.port}`
      );
    });
  }
}

export default Server;
