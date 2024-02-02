"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaController_1 = __importDefault(require("../controllers/mediaController"));
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = require("../middleware/auth");
class MediaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/avatar", mediaController_1.default.avatarWebsite);
        this.router.get("/", auth_1.verifyToken, mediaController_1.default.mediaList);
        this.router.post("/", auth_1.verifyToken, multer_1.default, mediaController_1.default.uploadMedia);
        this.router.get("/:mediaId", auth_1.verifyToken, mediaController_1.default.mediaInfo);
        this.router.get("/search/:name", auth_1.verifyToken, mediaController_1.default.mediaSearch);
        this.router.delete("/:mediaId", auth_1.verifyToken, mediaController_1.default.deleteMedia);
    }
}
exports.default = new MediaRoutes().router;
