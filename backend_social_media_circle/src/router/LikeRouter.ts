import LikeController from "../controller/LikeController";
import { Router } from "express";
import auth from "../middleware/auth";
const likeRouter = Router();

likeRouter.get(
  "/like-of-thread/:threadId",
  auth.AccessValidation,
  LikeController.fatchLikeByTheread
);
likeRouter.post("/like", auth.AccessValidation, LikeController.doLike);
likeRouter.post("/remove-like", auth.AccessValidation, LikeController.unLike);
likeRouter.get(
  "/is-like-user-to-thread",
  auth.AccessValidation,
  LikeController.isLikeUserToThread
);

export default likeRouter;
