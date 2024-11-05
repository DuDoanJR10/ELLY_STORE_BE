import { Sequelize } from "sequelize";
import config from "../src/common/configs/config";

// const db = new Sequelize(
//   config.dbConfig.db,
//   config.dbConfig.user,
//   config.dbConfig.password,
//   {
//     host: config.dbConfig.host,
//     dialect: "mysql",
//   }
// );

const db = new Sequelize(config.dbConfig.db, config.dbConfig.user, config.dbConfig.password, {
  host: config.dbConfig.host,  // or the correct MySQL server address
  port: 3306,         // Default MySQL port, change if necessary
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000 // Optional: increase the timeout in milliseconds
  }
});


export default db;
