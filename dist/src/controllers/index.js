"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaController = exports.userController = exports.mainController = void 0;
const mainController_1 = __importDefault(require("./mainController"));
exports.mainController = mainController_1.default;
const userController_1 = __importDefault(require("./userController"));
exports.userController = userController_1.default;
const mediaController_1 = __importDefault(require("./mediaController"));
exports.mediaController = mediaController_1.default;
