import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface Error {
  status?: number;
  message?: string;
}

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
};

export default errorHandler;
