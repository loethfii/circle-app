import RepliesController from "../controller/RepliesController";
import { Router } from "express";
import auth from "../middleware/auth";

const routerReplies = Router();

routerReplies.get(
  "/replies",
  auth.AccessValidation,
  RepliesController.findAllReplieByThread
);
routerReplies.post(
  "/post-replies",
  auth.AccessValidation,
  RepliesController.createReplies
);
routerReplies.delete(
  "/delete-replies/:id",
  auth.AccessValidation,
  RepliesController.deleteReplies
);

export default routerReplies;
