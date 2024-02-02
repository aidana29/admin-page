"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "model/gltf-binary"];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!allowedFormats.includes(file.mimetype)) {
        const error = new Error("mimetype");
        return cb(null, false);
    }
    if (file.size > maxSize) {
        const error = new Error("size");
        return cb(null, false);
    }
    cb(null, true);
};
const storage = multer_1.default.memoryStorage();
const multerUpload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
}).array("file");
exports.default = multerUpload;
