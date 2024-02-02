import { Router } from "express";
import mainController from "../controllers/mainController"
import { verifyToken } from "../middleware/auth";

class MediaRoutes {
    router = Router();
  
    constructor() {
      this.initializeRoutes();
    }
  
    initializeRoutes() {
      this.router.get("/", verifyToken, mainController);
    }
  }
  
  export default new MediaRoutes().router;