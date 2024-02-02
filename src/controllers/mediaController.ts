import { NextFunction, Request, Response } from "express";
import { mediaService } from "../services";
import awsUpload from "../utils/s3Config";

const avatarWebsite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await mediaService.avatarMedia();
    res.status(200).json({
      message: "SUCCESS",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

const mediaList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;
    const { role } = req;
    const data = await mediaService.allMedia(userId!, role!);
    res.status(200).json({
      message: "MEDIA_LIST_SUCCESS",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files: any = req.files;
    const uploader = req.userId;
    const { role } = req;
    const fileName = req.body.fileName;
    const uploadedFile = await awsUpload(files, fileName);
    const avatarLink = uploadedFile.avatarFileLink;
    const thumbnailLink = uploadedFile.thumbnailFileLink;
    const avatarName = uploadedFile.nameWithoutQuotes;
    await mediaService.saveFileLink(
      uploader!,
      avatarName,
      avatarLink,
      thumbnailLink,
      role!
    );
    res.status(200).json({
      message: "MEDIA_UPLOAD_SUCCESS",
    });
  } catch (err) {
    next(err);
  }
};

const mediaInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mediaId } = req.params;
    const { role } = req;
    const mediaInfo: object = await mediaService.mediaInfo(
      parseInt(mediaId),
      role!
    );
    res.status(200).json({
      message: "MEDIA_INFO_SUCCESS",
      data: mediaInfo,
    });
  } catch (err) {
    next(err);
  }
};

const mediaSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: any = req.params;
    const { role } = req;
    const mediaInfo: object = await mediaService.mediaSearch(name, role!);
    res.status(200).json({
      message: "MEDIA_SEARCH_SUCCESS",
      data: mediaInfo,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req;
    const { mediaId } = req.params;
    await mediaService.deleteMedia(parseInt(mediaId), role!);
    res.status(200).json({
      message: "MEDIA_DELETED",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  avatarWebsite,
  mediaList,
  uploadMedia,
  mediaInfo,
  mediaSearch,
  deleteMedia,
};
