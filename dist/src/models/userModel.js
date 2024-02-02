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
exports.UserRole = void 0;
const server_1 = require("../../server");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["STAFF"] = "staff";
})(UserRole || (exports.UserRole = UserRole = {}));
const findPasswordByEmailResult = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield server_1.myDataSource.query(`SELECT id, email, password, username, authentication FROM test_users WHERE email = ?`, [email]);
    return checkUser.length ? checkUser[0] : null;
});
const findByIdResult = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUserDetail = yield server_1.myDataSource.query(`SELECT email, username, authentication FROM test_users WHERE id = ?`, [userId]);
    return checkUserDetail;
});
const findMainUserResult = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.myDataSource.query(`SELECT id, email, username, authentication, created_at FROM test_users`);
});
const createUserResult = (email, hashedPassword, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    const createNewUser = yield server_1.myDataSource.query(`INSERT INTO test_users (email, password, username, authentication) VALUES (?,?,?,?)`, [email, hashedPassword, username, authentication]);
    return createNewUser;
});
const modifyUserWithoutPasswordResult = (userId, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield server_1.myDataSource.query(`UPDATE test_users SET username=?, authentication=? WHERE id= ?;`, [username, authentication, userId]);
});
const modifyUserResult = (userId, modifyPassword, username, authentication) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield server_1.myDataSource.query(`UPDATE test_users SET password=?, username=?, authentication=? WHERE id= ?;`, [modifyPassword, username, authentication, userId]);
});
const deleteUserResult = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userDelete = yield server_1.myDataSource.query(`DELETE FROM test_users WHERE id = ?;`, [userId]);
});
const userModel = {
    findPasswordByEmailResult,
    createUserResult,
    findByIdResult,
    modifyUserWithoutPasswordResult,
    modifyUserResult,
    findMainUserResult,
    deleteUserResult,
};
exports.default = userModel;
