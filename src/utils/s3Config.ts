import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

type Files = [
  {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  },
  {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }
];

const awsUpload = async (files: Files, fileName: string) => {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    region: process.env.S3_REGION!,
  });

  const avatar =
    files[0].mimetype === "model/gltf-binary" ? files[0] : files[1];
  const thumbnail =
    files[0].mimetype === "model/gltf-binary" ? files[1] : files[0];

  const nameWithoutQuotes = fileName.replace(/\"/g, "");

  const paramsAvatar = {
    Bucket: process.env.S3_BUCKET!,
    Key: `Avatar/avatar/${nameWithoutQuotes}.glb`,
    Body: avatar.buffer,
  };

  const paramsThumbnail = {
    Bucket: process.env.S3_BUCKET!,
    Key: `Avatar/thumnail/${thumbnail.originalname}`,
    Body: thumbnail.buffer,
  };

  await s3.send(new PutObjectCommand(paramsAvatar));
  await s3.send(new PutObjectCommand(paramsThumbnail));

  const avatarFileLink = process.env.S3_FILE_LINK + paramsAvatar.Key;
  const thumbnailFileLink = process.env.S3_FILE_LINK + paramsThumbnail.Key;

  return { avatarFileLink, thumbnailFileLink, nameWithoutQuotes };
};

export default awsUpload;
