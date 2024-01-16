import { Request, Response } from "express";
import ThreadService from "../service/ThreadService";

export default new (class threadsController {
  findAll(req: Request, res: Response): Promise<Response> {
    return ThreadService.findAll(req, res);
  }

  findOne(req: Request, res: Response): Promise<Response> {
    return ThreadService.findOne(req, res);
  }

  create(req: Request, res: Response): Promise<Response> {
    return ThreadService.create(req, res);
  }

  deletePost(req: Request, res: Response): Promise<Response> {
    return ThreadService.deletePost(req, res);
  }

  cobaRabbitMQ(req: Request, res: Response): Promise<Response> {
    return ThreadService.cobaRabbitMQ(req, res);
  }
})();
