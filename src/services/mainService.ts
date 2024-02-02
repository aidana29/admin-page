import { userModel } from "../models";

const userInfoMain = async (userId: number) => {
    const [userInfo] = await userModel.findByIdResult(userId)
    return userInfo
}

export default userInfoMain
