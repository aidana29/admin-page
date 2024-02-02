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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const loginInfo = yield services_1.userService.signIn(email, password);
        res.status(200).json({
            message: "LOGIN_SUCCESS",
            token: loginInfo.token,
        });
    }
    catch (err) {
        next(err);
    }
});
const getMainUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req;
        const mainUsers = yield services_1.userService.findMainUsers(role);
        return res.status(200).json({
            message: "GET_MAINUSER_SUCCESSFUL",
            data: mainUsers,
        });
    }
    catch (err) {
        next(err);
    }
});
const getUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { role } = req;
        const userInformation = yield services_1.userService.findById(userId, role);
        if (userInformation) {
            return res.status(200).json({
                message: "GET_USER_SUCCESSFUL",
                data: userInformation,
            });
        }
    }
    catch (err) {
        next(err);
    }
});
const newUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, authentication } = req.body;
        const { role } = req;
        const addNewUser = yield services_1.userService.registerUser(role, email, password, username, authentication);
        return res.status(201).json({
            message: "CREATE_USER_SUCCESS",
        });
    }
    catch (err) {
        next(err);
    }
});
const modifyUserInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req;
        const userId = parseInt(req.params.userId, 10);
        const { password, username, authentication } = req.body;
        if (!password && username && authentication) {
            yield services_1.userService.modifyUserWithoutPassword(role, userId, username, authentication);
        }
        if (password && username && authentication) {
            yield services_1.userService.modifyUser(role, userId, password, username, authentication);
        }
        const updateUserinformation = yield services_1.userService.findById(userId, role);
        return res.status(200).json({
            message: "UPDATE_USER_INFO_SUCCESS",
            data: updateUserinformation,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteUserInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req;
        const userId = parseInt(req.params.userId, 10);
        const deleteDetail = yield services_1.userService.deleteUser(userId, role);
        return res.status(200).json({
            message: "DELETE_USER_SUCCESS",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    userLogin,
    getMainUsers,
    getUserDetail,
    newUsers,
    modifyUserInformation,
    deleteUserInformation,
};
