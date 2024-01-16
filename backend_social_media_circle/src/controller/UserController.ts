import { Request, Response } from "express";
import UserService from "../service/UserService";

export default new (class UserController {
  findAll(req: Request, res: Response): Promise<Response> {
    return UserService.findAll(req, res);
  }

  findOne(req: Request, res: Response): Promise<Response> {
    return UserService.findOne(req, res);
  }

  create(req: Request, res: Response): Promise<Response> {
    return UserService.create(req, res);
  }

  updateProfile(req: Request, res: Response): Promise<Response> {
    return UserService.updateProfile(req, res);
  }

  detailFollowingFollower(req: Request, res: Response): Promise<Response> {
    return UserService.detailFollowAndFollower(req, res);
  }

  loginUser(req: Request, res: Response): Promise<Response> {
    return UserService.loginUser(req, res);
  }

  checkUser(req: Request, res: Response): Promise<Response> {
    return UserService.check(req, res);
  }

  deleteUser(req: Request, res: Response): Promise<Response> {
    return UserService.deleteUser(req, res);
  }

  sugestedUser(req: Request, res: Response): Promise<Response> {
    return UserService.sugestedUser(req, res);
  }

  updateFoto(req: Request, res: Response): Promise<Response> {
    return UserService.updateFoto(req, res);
  }

  searchUser(req: Request, res: Response): Promise<Response> {
    return UserService.searchUser(req, res);
  }
})();
