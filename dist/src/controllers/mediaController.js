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
const services_1 = require("../services");
const s3Config_1 = __importDefault(require("../utils/s3Config"));
const avatarWebsite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield services_1.mediaService.avatarMedia();
        res.status(200).json({
            message: "SUCCESS",
            data: data,
        });
    }
    catch (err) {
        next(err);
    }
});
const mediaList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const { role } = req;
        const data = yield services_1.mediaService.allMedia(userId, role);
        res.status(200).json({
            message: "MEDIA_LIST_SUCCESS",
            data: data,
        });
    }
    catch (err) {
        next(err);
    }
});
const uploadMedia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const uploader = req.userId;
        const { role } = req;
        const fileName = req.body.fileName;
        const uploadedFile = yield (0, s3Config_1.default)(files, fileName);
        const avatarLink = uploadedFile.avatarFileLink;
        const thumbnailLink = uploadedFile.thumbnailFileLink;
        const avatarName = uploadedFile.nameWithoutQuotes;
        yield services_1.mediaService.saveFileLink(uploader, avatarName, avatarLink, thumbnailLink, role);
        res.status(200).json({
            message: "MEDIA_UPLOAD_SUCCESS",
        });
    }
    catch (err) {
        next(err);
    }
});
const mediaInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mediaId } = req.params;
        const { role } = req;
        const mediaInfo = yield services_1.mediaService.mediaInfo(parseInt(mediaId), role);
        res.status(200).json({
            message: "MEDIA_INFO_SUCCESS",
            data: mediaInfo,
        });
    }
    catch (err) {
        next(err);
    }
});
const mediaSearch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const { role } = req;
        const mediaInfo = yield services_1.mediaService.mediaSearch(name, role);
        res.status(200).json({
            message: "MEDIA_SEARCH_SUCCESS",
            data: mediaInfo,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteMedia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req;
        const { mediaId } = req.params;
        yield services_1.mediaService.deleteMedia(parseInt(mediaId), role);
        res.status(200).json({
            message: "MEDIA_DELETED",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    avatarWebsite,
    mediaList,
    uploadMedia,
    mediaInfo,
    mediaSearch,
    deleteMedia,
};
