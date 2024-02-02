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
const models_1 = require("../models");
const avatarMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield models_1.mediaModel.forAvatarWebsite();
    return data;
});
const allMedia = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    const data = yield models_1.mediaModel.findAllMedia(userId);
    return data;
});
const saveFileLink = (uploader, avatarName, fileLink, thumbnailLink, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (!uploader || !avatarName || !fileLink || !thumbnailLink) {
        const error = new Error("KEY_ERROR");
        error.status = 400;
        throw error;
    }
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    yield models_1.mediaModel.saveFileToDb(uploader, avatarName, fileLink, thumbnailLink);
});
const mediaInfo = (mediaId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    const [checkMedia] = yield models_1.mediaModel.findMediaById(mediaId);
    if (!checkMedia) {
        const error = new Error("NO_EXISTING_MEDIA");
        error.status = 400;
        throw error;
    }
    return yield models_1.mediaModel.findMediaById(mediaId);
});
const mediaSearch = (name, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin" && role !== "staff") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    const [checkMediaName] = yield models_1.mediaModel.findMediaByName(name);
    if (!checkMediaName) {
        const error = new Error("NO_EXISTING_MEDIA");
        error.status = 400;
        throw error;
    }
    return checkMediaName;
});
const deleteMedia = (mediaId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== "admin") {
        const error = new Error("NOT_AUTHORIZED");
        error.status = 400;
        throw error;
    }
    const [checkMedia] = yield models_1.mediaModel.findMediaById(mediaId);
    if (!checkMedia) {
        const error = new Error("NO_EXISTING_MEDIA");
        error.status = 400;
        throw error;
    }
    yield models_1.mediaModel.deleteMedia(mediaId);
});
exports.default = { avatarMedia, allMedia, saveFileLink, mediaInfo, mediaSearch, deleteMedia };
