"use strict";
const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const app = express();
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "0.4.0",
            title: "FluentT web motion capture API docs",
            description: "web motion capture API 문서입니다",
            license: "MIT"
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/swagger/*.yaml"],
};
const swaggerSpec = swaggerJSDoc(options);
app.use("./src/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
