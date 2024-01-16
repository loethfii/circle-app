import FollowsController from "../controller/FollowsController";
import { Router } from "express";
import auth from "../middleware/auth";

const followsRouter = Router();

followsRouter.post(
  "/follow",
  auth.AccessValidation,
  FollowsController.followOnePerson
);
followsRouter.get(
  "/my-account-follow-status/:myAccount",
  auth.AccessValidation,
  FollowsController.seeMYAccountFF
);
followsRouter.delete(
  "/unfollow",
  auth.AccessValidation,
  FollowsController.unfollowOnePerson
);

followsRouter.get(
  "/is-follow-by-you",
  auth.AccessValidation,
  FollowsController.isFollowByYou
);

followsRouter.get(
  "/list-follower",
  auth.AccessValidation,
  FollowsController.listFollower
);

followsRouter.get(
  "/list-following",
  auth.AccessValidation,
  FollowsController.listFollowing
);

followsRouter.get(
  "/list-id-user-has-follow",
  auth.AccessValidation,
  FollowsController.listIdUserHasFollow
);
export default followsRouter;
