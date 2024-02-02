"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.RDS_ENDPOINT,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});
exports.default = AppDataSource;
