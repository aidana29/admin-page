import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: number;
      role?: string;
    }
  }
}

interface Error {
  status?: number;
  message?: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const error: Error = new Error("NO_TOKEN");
      error.status = 400;
      throw error;
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    } catch (err) {
      const error: Error = new Error("INVALID_TOKEN");
      error.status = 400;
      throw error;
    }
    const userId = decoded.id;
    const role = decoded.role;
    userModel.findByIdResult(userId).then((user) => {
      if (!user) {
        const error: Error = new Error("USER NOT FOUND");
        error.status = 400;
        throw error;
      }
      req.userId = userId;
      req.role = role;
      next();
    });
  } catch (error) {
    next(error);
  }
};
