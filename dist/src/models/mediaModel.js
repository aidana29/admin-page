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
const server_1 = require("../../server");
const forAvatarWebsite = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.myDataSource.query(`SELECT file_name, file_url, thumbnail_url, id
    FROM test_posts`);
    return data;
});
const findAllMedia = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield server_1.myDataSource.query(`SELECT file_name, file_url, thumbnail_url, uploader, id
    FROM test_posts 
    WHERE uploader = ?`, [userId]);
    return data;
});
const saveFileToDb = (uploader, avatarName, fileLink, thumbnailLink) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.myDataSource.query(`INSERT INTO test_posts 
    (uploader, file_name, file_url, thumbnail_url) 
    VALUES (?, ?, ?, ?)`, [uploader, avatarName, fileLink, thumbnailLink]);
});
const deleteMedia = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.myDataSource.query(`DELETE 
    FROM test_posts 
    WHERE id = ?`, [mediaId]);
});
const findMediaById = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const mediaCheck = yield server_1.myDataSource.query(`SELECT *
    FROM test_posts 
    WHERE id = ?`, [mediaId]);
    return mediaCheck;
});
const findMediaByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const mediaCheck = yield server_1.myDataSource.query(`SELECT *
    FROM test_posts 
    WHERE file_name = ?`, [name]);
    return mediaCheck;
});
exports.default = {
    forAvatarWebsite,
    findAllMedia,
    saveFileToDb,
    deleteMedia,
    findMediaById,
    findMediaByName,
};
