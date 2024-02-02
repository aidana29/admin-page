import "dotenv/config";
import { userModel } from "../models";
import { Iusers, UserRole } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface Error {
  status?: number;
  message?: string;
}

const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    const error: Error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }
  const userCheck = await userModel.findPasswordByEmailResult(email);
  if (!userCheck) {
    const error: Error = new Error("NOT_REGISTERED");
    error.status = 400;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, userCheck.password);
  if (isMatch === false) {
    const error: Error = new Error("WRONG_PASSWORD");
    error.status = 400;
    throw error;
  }
  const user = userCheck;
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      id: user.id,
      role: user.authentication,
    },
    secretKey as string,
    {
      expiresIn: "1h",
    }
  );
  return { token: token, userId: user.id, username: user.username };
};

const findMainUsers = async (role: string) => {
  if (role !== "admin" && role !== "staff") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 403;
    throw error;
  }
  return userModel.findMainUserResult();
};

const findById = async (userId: number, role: string) => {
  if (role !== "admin" && role !== "staff") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 403;
    throw error;
  }
  const userdata = await userModel.findByIdResult(userId);
  return userdata;
};

const registerUser = async (
  role: string,
  email: string,
  password: string,
  username: string,
  authentication: UserRole
) => {
  if (role !== "admin") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 403;
    throw error;
  }
  const isEmailDuplicate = await userModel.findPasswordByEmailResult(email);
  if (isEmailDuplicate !== null) {
    const error: Error = new Error("EXISTING_EMAILADDRESS.");
    error.status = 400;
    throw error;
  }
  const isEmailFormat = async (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailRegex)) {
      const error: Error = new Error("INVALID_EMAIL_FORMAT.");
      error.status = 400;
      throw error;
    }
  };

  const hashedPassword = await bcrypt.hash(password, 12);
  await userModel.createUserResult(
    email,
    hashedPassword,
    username,
    authentication
  );
};

const modifyUserWithoutPassword = async (
  role: string,
  userId: number,
  username: string,
  authentication: UserRole
) => {
  if (role !== "admin") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 403;
    throw error;
  }
  await userModel.modifyUserWithoutPasswordResult(
    userId,
    username,
    authentication
  );
};

const modifyUser = async (
  role: string,
  userId: number,
  password: string,
  username: string,
  authentication: UserRole
) => {
  if (role !== "admin") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 403;
    throw error;
  }
  const modifyPassword = await bcrypt.hash(password, 12);
  await userModel.modifyUserResult(
    userId,
    modifyPassword,
    username,
    authentication
  );
};

const deleteUser = async (userId: number, role: string) => {
  if (role !== "admin") {
    const error: Error = new Error("NOT_AUTHORIZED");
    error.status = 400;
    throw error;
  }
  userModel.deleteUserResult(userId);
};

export default {
  signIn,
  findById,
  findMainUsers,
  registerUser,
  modifyUserWithoutPassword,
  modifyUser,
  deleteUser,
};
