import UserController from "../controller/UserController";
import { Router } from "express";
const routerUser = Router();
import auth from "../middleware/auth";
import multerConfig from "../middleware/multer";

const uploadImage = new multerConfig("profile_picture");

routerUser.get("/user", UserController.findAll);
routerUser.get("/detail-user/:id", UserController.findOne);
routerUser.post(
  "/post-user",
  uploadImage.handleUpload.bind(uploadImage),
  UserController.create
);
routerUser.get(
  "/profile",
  auth.AccessValidation,
  UserController.detailFollowingFollower
);
routerUser.post("/login", UserController.loginUser);
routerUser.get("/check-user", auth.AccessValidation, UserController.checkUser);
routerUser.delete("/delete-user/:id", UserController.deleteUser);
routerUser.get(
  "/sugested-user",
  auth.AccessValidation,
  UserController.sugestedUser
);

routerUser.put(
  "/update-profile",
  auth.AccessValidation,
  UserController.updateProfile
);

routerUser.put(
  "/update-foto",
  auth.AccessValidation,
  uploadImage.handleUpload.bind(uploadImage),
  UserController.updateFoto
);

routerUser.get(
  "/search-user",
  auth.AccessValidation,
  UserController.searchUser
);

export default routerUser;
