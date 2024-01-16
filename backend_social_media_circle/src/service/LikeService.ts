import { Request, Response } from "express";
import { Likes } from "../entity/Likes";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import jwtconfig from "../middleware/auth";
import { likeSchema } from "../utils/validators/LikeValidator";
import LikeWorker from "../libs/rabbitmq/LikeWorker";

export default new (class LikeService {
  private readonly likeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);
  async fatchLikeByTheread(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId } = req.params;
      const responseFatchLikeByThread = await this.likeRepository.find({
        relations: ["thread", "user"],
        where: {
          threadId: Number(threadId),
        },
      });

      if (!responseFatchLikeByThread) {
        return res.status(404).json({
          message: "Thread not found",
          status: 404,
        });
      }

      return res.status(200).json({
        message: "success",
        status: 200,
        data: responseFatchLikeByThread,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }
  async doLike(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = likeSchema.validate(req.body);
      const rabbitMqService = new LikeWorker();
      await rabbitMqService.init();

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }
      const { threadId } = value;
      const objUser = res.locals.loginSession;

      const dataPublished = {
        userId: objUser.userId,
        threadId: threadId,
      };

      await rabbitMqService.sendMessageToQueue(dataPublished);

      const data = await rabbitMqService.consumeMessageQueue();

      const dataToJson = JSON.parse(data);

      await rabbitMqService.closeConnection();

      const doLike = new Likes();
      doLike.userId = dataToJson.userId;
      doLike.threadId = dataToJson.threadId;
      // doLike.userId = objUser.userId;
      // doLike.threadId = threadId;

      await this.likeRepository.save(doLike);

      return res.status(200).json({
        message: "success",
        status: 200,
        data: doLike,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async isLikeUserToThread(req: Request, res: Response): Promise<Response> {
    try {
      const params = req.query;
      const tokenHeader = req.headers.authorization;
      const obj = jwtconfig.decode(tokenHeader);
      // const { threadID } = req.body;
      const countThread = await this.likeRepository.count({
        where: {
          userId: obj.userId,
          threadId: Number(params.threadId),
        },
      });

      let isLike: boolean;
      if (countThread === 0) {
        isLike = false;
      } else {
        isLike = true;
      }

      return res.status(200).json({
        message: "success",
        status: 200,
        data: isLike,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        status: 500,
      });
    }
  }

  async unLike(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;
      const { threadID } = req.body;
      const countThread = await this.likeRepository.count({
        where: {
          userId: obj.userId,
          threadId: Number(threadID),
        },
      });

      if (countThread === 0) {
        return res.status(404).json({
          message: "Thread not found",
          status: 404,
        });
      }

      const rabbitMqService = new LikeWorker();
      await rabbitMqService.init();

      const dataPublished = {
        userId: obj.userId,
        threadId: threadID,
      };

      await rabbitMqService.sendMessageToQueue(dataPublished);

      const data = await rabbitMqService.consumeMessageQueue();

      const dataToJson = JSON.parse(data);

      await rabbitMqService.closeConnection();

      await this.likeRepository.delete({
        userId: dataToJson.userId,
        threadId: dataToJson.threadId,
        // userId: obj.userId,
        // threadId: Number(threadID),
      });
      return res.status(200).json({
        message: "success",
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }
})();
