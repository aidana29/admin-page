import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
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

const storage = multer.memoryStorage();
const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("file");

export default multerUpload;
