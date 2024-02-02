"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const userController_1 = __importDefault(require("../controllers/userController"));
class userRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // login
        this.router.get("/", auth_1.verifyToken, userController_1.default.getMainUsers);
        this.router.post("/", userController_1.default.userLogin);
        // create
        this.router.post("/new", auth_1.verifyToken, userController_1.default.newUsers);
        // read
        this.router.get("/:userId", auth_1.verifyToken, userController_1.default.getUserDetail);
        // update
        this.router.patch("/:userId", auth_1.verifyToken, userController_1.default.modifyUserInformation);
        // Delete
        this.router.delete("/:userId", auth_1.verifyToken, userController_1.default.deleteUserInformation);
    }
}
exports.default = new userRoutes().router;
