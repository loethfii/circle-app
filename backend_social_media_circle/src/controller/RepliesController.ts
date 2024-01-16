import { Request, Response } from "express";
import RepliesService from "../service/RepliesService";

export default new (class RepliesController {
  findAllReplieByThread(req: Request, res: Response): Promise<Response> {
    return RepliesService.findAllReplieByThread(req, res);
  }

  createReplies(req: Request, res: Response): Promise<Response> {
    return RepliesService.createReplies(req, res);
  }

  deleteReplies(req: Request, res: Response): Promise<Response> {
    return RepliesService.deleteReplies(req, res);
  }
})();
