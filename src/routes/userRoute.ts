import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import userController from "../controllers/userController";

class userRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // login
    this.router.get("/", verifyToken, userController.getMainUsers);
    this.router.post("/", userController.userLogin);

    // create
    this.router.post("/new", verifyToken, userController.newUsers);

    // read
    this.router.get("/:userId", verifyToken, userController.getUserDetail);
    // update
    this.router.patch(
      "/:userId",
      verifyToken,
      userController.modifyUserInformation
    );

    // Delete
    this.router.delete(
      "/:userId",
      verifyToken,
      userController.deleteUserInformation
    );
  }
}

export default new userRoutes().router;
