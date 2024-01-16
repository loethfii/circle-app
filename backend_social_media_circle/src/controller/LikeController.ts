import { Request, Response } from "express";
import LikeService from "../service/LikeService";

export default new (class LikeController {
  fatchLikeByTheread(req: Request, res: Response): Promise<Response> {
    return LikeService.fatchLikeByTheread(req, res);
  }

  doLike(req: Request, res: Response): Promise<Response> {
    return LikeService.doLike(req, res);
  }

  unLike(req: Request, res: Response): Promise<Response> {
    return LikeService.unLike(req, res);
  }

  isLikeUserToThread(req: Request, res: Response): Promise<Response> {
    return LikeService.isLikeUserToThread(req, res);
  }
})();
