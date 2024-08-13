import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  //before we upload avatar & coverImage on cloudinary,
  //we would want to upload the avatar & coverImage to our local server using multer middleware
  //so if we want to upload multiple fields of the same form, we can use upload.fields([])
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;
