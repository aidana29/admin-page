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
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const awsUpload = (files, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new client_s3_1.S3Client({
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: process.env.S3_REGION,
    });
    const avatar = files[0].mimetype === "model/gltf-binary" ? files[0] : files[1];
    const thumbnail = files[0].mimetype === "model/gltf-binary" ? files[1] : files[0];
    const nameWithoutQuotes = fileName.replace(/\"/g, "");
    const paramsAvatar = {
        Bucket: process.env.S3_BUCKET,
        Key: `Avatar/avatar/${nameWithoutQuotes}.glb`,
        Body: avatar.buffer,
    };
    const paramsThumbnail = {
        Bucket: process.env.S3_BUCKET,
        Key: `Avatar/thumnail/${thumbnail.originalname}`,
        Body: thumbnail.buffer,
    };
    yield s3.send(new client_s3_1.PutObjectCommand(paramsAvatar));
    yield s3.send(new client_s3_1.PutObjectCommand(paramsThumbnail));
    const avatarFileLink = process.env.S3_FILE_LINK + paramsAvatar.Key;
    const thumbnailFileLink = process.env.S3_FILE_LINK + paramsThumbnail.Key;
    return { avatarFileLink, thumbnailFileLink, nameWithoutQuotes };
});
exports.default = awsUpload;
