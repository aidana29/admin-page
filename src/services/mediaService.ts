import { mediaModel } from "../models";

interface Error {
  status?: number;
  message?: string;
}

const avatarMedia = async () => {
  const data = await mediaModel.forAvatarWebsite();
  return data;
};

const allMedia = async (userId: number, role: string) => {
  if (role !== "admin" && role !== "staff"){
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;  
  }
  const data = await mediaModel.findAllMedia(userId);
  return data;
};

const saveFileLink = async (
  uploader: number,
  avatarName: string,
  fileLink: string,
  thumbnailLink: string,
  role: string,
) => {
  if (!uploader || !avatarName || !fileLink || !thumbnailLink){
    const error: Error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }
  if (role !== "admin" && role !== "staff"){
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;  
  }
  await mediaModel.saveFileToDb(uploader, avatarName, fileLink, thumbnailLink);
};

const mediaInfo = async (mediaId: number, role: string) => {
  if (role !== "admin" && role !== "staff"){
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;  
  }
  const [checkMedia] = await mediaModel.findMediaById(mediaId);
  if (!checkMedia){
    const error: Error = new Error("NO_EXISTING_MEDIA");
    error.status = 400;
    throw error;
  }
  return await mediaModel.findMediaById(mediaId);
};

const mediaSearch = async (name: string, role: string) => {
  if (role !== "admin" && role !== "staff"){
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;  
  }
  const [checkMediaName] = await mediaModel.findMediaByName(name);
  if (!checkMediaName){
    const error: Error = new Error("NO_EXISTING_MEDIA");
    error.status = 400;
    throw error;
  }
  return checkMediaName
};

const deleteMedia = async (mediaId: number, role: string) => {
  if (role !== "admin"){
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;  
  }
  const [checkMedia] = await mediaModel.findMediaById(mediaId);
  if (!checkMedia){
    const error: Error = new Error("NO_EXISTING_MEDIA");
    error.status = 400;
    throw error;
  }
  await mediaModel.deleteMedia(mediaId);
};

export default { avatarMedia, allMedia, saveFileLink, mediaInfo, mediaSearch, deleteMedia };
