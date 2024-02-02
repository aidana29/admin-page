"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/index"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
const server = new index_1.default(app);
require("dotenv").config();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const { RDS_ENDPOINT, DB_USERNAME, DB_PW, DB_NAME } = process.env;
// Initialize TypeORM connection
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: RDS_ENDPOINT,
    port: 3306,
    username: DB_USERNAME,
    password: DB_PW,
    database: DB_NAME,
});
exports.myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
});
app
    .listen(port, "localhost", () => {
    console.log(`Server listening on port ${port}`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
