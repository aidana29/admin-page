import { NextFunction, Request, Response } from "express";
import { mainService } from "../services";

const userInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req
        const userInfo = await mainService(userId!)
        const data = {userName: userInfo.username, userRole: userInfo.authentication}
        res.status(200).json({
            message: "USER_INFO_SUCCESS",
            data: data
        })
    } catch(err) {
        next(err);
    }
}

export default userInfo