import express, { Application } from "express";
import config from "./common/configs/config";
import cors from "cors";
import db from "../db/connection";
import router from "./routes";
import SeederService from "./services/seeder.service";
import CategoryModel from "./models/category.model";
import ProductModel from "./models/product.model";
import ProductAttributeModel from "./models/productAttribute.model";
import swaggerUi from "swagger-ui-express";
import specs from "./common/configs/swagger_output.json";

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
      // Define relationships category has many products
      CategoryModel.hasMany(ProductModel, {
        foreignKey: "category_id",
        as: "products",
      });
      
      ProductModel.belongsTo(CategoryModel, {
        foreignKey: "category_id",
        as: "category",
      });

      // Define relationships product has many product attributes
      ProductModel.hasMany(ProductAttributeModel, {
        foreignKey: "product_id",
        as: "product_attributes",
      })
      
      ProductAttributeModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product",
      });

      await db.authenticate();
      console.log("Database connected");

      await db.sync({ alter: true });
      console.log("Database synchronized");

      // Seeder
      await SeederService.seed();
    } catch (error: any) {
      console.error(error, "Error connecting to DB");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));

    // Swagger
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  routes() {
    router(this.app);
  }

  listen() {
    this.app.listen(config.port, () => {
      console.log(
        `Server up and running at port: http://localhost:${config.port}`
      );
      console.log(`Swagger documentation available at http://localhost:${config.port}/docs`);
    });
  }
}

export default Server;
