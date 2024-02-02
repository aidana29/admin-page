import { Router } from "express";
import mediaController from "../controllers/mediaController";
import multerUpload from "../middleware/multer"
import { verifyToken } from "../middleware/auth";

class MediaRoutes {
    router = Router();
  
    constructor() {
      this.initializeRoutes();
    }
  
    initializeRoutes() {
      this.router.get("/avatar", mediaController.avatarWebsite);
      this.router.get("/", verifyToken, mediaController.mediaList);
      this.router.post("/", verifyToken, multerUpload, mediaController.uploadMedia)
      this.router.get("/:mediaId", verifyToken, mediaController.mediaInfo);
      this.router.get("/search/:name", verifyToken, mediaController.mediaSearch);
      this.router.delete("/:mediaId", verifyToken, mediaController.deleteMedia);
    }
  }
  
  export default new MediaRoutes().router;