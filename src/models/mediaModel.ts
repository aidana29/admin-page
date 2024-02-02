import { myDataSource } from "../../server";

const forAvatarWebsite = async () => {
  const data = await myDataSource.query(
    `SELECT file_name, file_url, thumbnail_url, id
    FROM test_posts`,
  );
  return data;
};

const findAllMedia = async (userId: number) => {
  const data = await myDataSource.query(
    `SELECT file_name, file_url, thumbnail_url, uploader, id
    FROM test_posts 
    WHERE uploader = ?`,
    [userId]
  );
  return data;
};

const saveFileToDb = async (
  uploader: number,
  avatarName: string,
  fileLink: string,
  thumbnailLink: string
) => {
  await myDataSource.query(
    `INSERT INTO test_posts 
    (uploader, file_name, file_url, thumbnail_url) 
    VALUES (?, ?, ?, ?)`,
    [uploader, avatarName, fileLink, thumbnailLink]
  );
};

const deleteMedia = async (mediaId: number) => {
  await myDataSource.query(
    `DELETE 
    FROM test_posts 
    WHERE id = ?`,
    [mediaId]
  );
};

const findMediaById = async (mediaId: number) => {
  const mediaCheck = await myDataSource.query(
    `SELECT *
    FROM test_posts 
    WHERE id = ?`,
    [mediaId]
  );
  return mediaCheck;
};

const findMediaByName = async (name: string) => {
  const mediaCheck = await myDataSource.query(
    `SELECT *
    FROM test_posts 
    WHERE file_name = ?`,
    [name]
  );
  return mediaCheck;
};

export default {
  forAvatarWebsite,
  findAllMedia,
  saveFileToDb,
  deleteMedia,
  findMediaById,
  findMediaByName,
};
