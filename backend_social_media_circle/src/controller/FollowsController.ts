import { Request, Response } from "express";
import FollowsService from "../service/FollowsService";

export default new (class FollowsController {
  followOnePerson(req: Request, res: Response): Promise<Response> {
    return FollowsService.followOnePerson(req, res);
  }

  seeMYAccountFF(req: Request, res: Response): Promise<Response> {
    return FollowsService.seeMYAccountFF(req, res);
  }

  unfollowOnePerson(req: Request, res: Response): Promise<Response> {
    return FollowsService.unfollowOnePerson(req, res);
  }

  isFollowByYou(req: Request, res: Response): Promise<Response> {
    return FollowsService.isFollowByYou(req, res);
  }

  listFollower(req: Request, res: Response): Promise<Response> {
    return FollowsService.listFollowers(req, res);
  }

  listFollowing(req: Request, res: Response): Promise<Response> {
    return FollowsService.listFollowing(req, res);
  }

  listIdUserHasFollow(req: Request, res: Response): Promise<Response> {
    return FollowsService.listIdUserHasFollow(req, res);
  }
})();
