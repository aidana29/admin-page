"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            const error = new Error("NO_TOKEN");
            error.status = 400;
            throw error;
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        }
        catch (err) {
            const error = new Error("INVALID_TOKEN");
            error.status = 400;
            throw error;
        }
        const userId = decoded.id;
        const role = decoded.role;
        userModel_1.default.findByIdResult(userId).then((user) => {
            if (!user) {
                const error = new Error("USER NOT FOUND");
                error.status = 400;
                throw error;
            }
            req.userId = userId;
            req.role = role;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
