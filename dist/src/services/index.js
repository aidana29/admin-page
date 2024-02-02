"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaService = exports.userService = exports.mainService = void 0;
const mainService_1 = __importDefault(require("./mainService"));
exports.mainService = mainService_1.default;
const userService_1 = __importDefault(require("./userService"));
exports.userService = userService_1.default;
const mediaService_1 = __importDefault(require("./mediaService"));
exports.mediaService = mediaService_1.default;
