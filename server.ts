import express, { Application } from "express";
import Server from "./src/index";
import { DataSource } from "typeorm";

const app: Application = express();
const server: Server = new Server(app);

require("dotenv").config();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const { RDS_ENDPOINT, DB_USERNAME, DB_PW, DB_NAME } = process.env;

// Initialize TypeORM connection
export const myDataSource = new DataSource({
  type: "mysql",
  host: RDS_ENDPOINT,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PW,
  database: DB_NAME,
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app
  .listen(port, "localhost", () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
