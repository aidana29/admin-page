"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        const error = new Error("KEY_ERROR");
        error.status = 400;
        throw error;
    }
    const userCheck = yield models_1.userModel.findPasswordByEmailResult(email);
    if (!userCheck) {
        const error = new Error("NOT_REGISTERED");
        error.status = 400;
        throw error;
    }
    const isMatch = yield bcrypt_1.default.compare(password, userCheck.password);
    if (isMatch === false) {
        const error = new Error("WRONG_PASSWORD");
        error.status = 400;
        throw error;
    }
    const user = userCheck;
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.authentication,
    }, secretKey, {
        expiresIn: "1h",
    });
    return { token: token, userId: user.id, username: user.username };
});
const findMainUsers = (role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 403;
        throw error;
    }
    return models_1.userModel.findMainUserResult();
});
const findById = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 403;
        throw error;
    }
    const userdata = yield models_1.userModel.findByIdResult(userId);
    return userdata;
});
const registerUser = (role, email, password, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 403;
        throw error;
    }
    const isEmailDuplicate = yield models_1.userModel.findPasswordByEmailResult(email);
    if (isEmailDuplicate !== null) {
        const error = new Error("EXISTING_EMAILADDRESS.");
        error.status = 400;
        throw error;
    }
    const isEmailFormat = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email.match(emailRegex)) {
            const error = new Error("INVALID_EMAIL_FORMAT.");
            error.status = 400;
            throw error;
        }
    });
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    yield models_1.userModel.createUserResult(email, hashedPassword, username, authentication);
});
const modifyUserWithoutPassword = (role, userId, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 403;
        throw error;
    }
    yield models_1.userModel.modifyUserWithoutPasswordResult(userId, username, authentication);
});
const modifyUser = (role, userId, password, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 403;
        throw error;
    }
    const modifyPassword = yield bcrypt_1.default.hash(password, 12);
    yield models_1.userModel.modifyUserResult(userId, modifyPassword, username, authentication);
});
const deleteUser = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    models_1.userModel.deleteUserResult(userId);
});
exports.default = {
    signIn,
    findById,
    findMainUsers,
    registerUser,
    modifyUserWithoutPassword,
    modifyUser,
    deleteUser,
};
