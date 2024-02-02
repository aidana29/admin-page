import express, { Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { Iusers, UserRole } from "../models/userModel";
import errorHandler from "../middleware/errorHandling";
import bcrypt from "bcrypt";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginInfo = await userService.signIn(email, password);
    res.status(200).json({
      message: "LOGIN_SUCCESS",
      token: loginInfo.token,
    });
  } catch (err) {
    next(err);
  }
};

const getMainUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req;
    const mainUsers = await userService.findMainUsers(role!);
    return res.status(200).json({
      message: "GET_MAINUSER_SUCCESSFUL",
      data: mainUsers,
    });
  } catch (err) {
    next(err);
  }
};

const getUserDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const { role } = req;
    const userInformation = await userService.findById(userId!, role!);
    if (userInformation) {
      return res.status(200).json({
        message: "GET_USER_SUCCESSFUL",
        data: userInformation,
      });
    }
  } catch (err) {
    next(err);
  }
};

const newUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username, authentication } = req.body;

    const { role } = req;
    const addNewUser = await userService.registerUser(
      role!,
      email!,
      password!,
      username!,
      authentication!
    );
    return res.status(201).json({
      message: "CREATE_USER_SUCCESS",
    });
  } catch (err) {
    next(err);
  }
};

const modifyUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req;
    const userId = parseInt(req.params.userId, 10);
    const { password, username, authentication } = req.body;

    if (!password && username && authentication) {
      await userService.modifyUserWithoutPassword(
        role!,
        userId,
        username!,
        authentication!
      );
    }
    if (password && username && authentication) {
      await userService.modifyUser(
        role!,
        userId,
        password,
        username!,
        authentication!
      );
    }
    const updateUserinformation = await userService.findById(userId!, role!);

    return res.status(200).json({
      message: "UPDATE_USER_INFO_SUCCESS",
      data: updateUserinformation,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req;
    const userId = parseInt(req.params.userId, 10);
    const deleteDetail = await userService.deleteUser(userId!, role!);

    return res.status(200).json({
      message: "DELETE_USER_SUCCESS",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  userLogin,
  getMainUsers,
  getUserDetail,
  newUsers,
  modifyUserInformation,
  deleteUserInformation,
};
