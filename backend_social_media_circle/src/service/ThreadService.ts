import { Threads } from "../entity/Threads";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import moment from "moment";
import { threadSchema } from "../utils/validators/ThreadValidators";
import jwtConfig from "../middleware/auth";
import cloudinaryConfig from "../middleware/cloudinary";
import { Likes } from "../entity/Likes";
import ThreadWorker from "../libs/rabbitmq/ThreadWorker";
import ThreadRedis from "../libs/redis/ThreadRedis";
import { createClient } from "redis";

export default new (class ThreadsService {
  private readonly threadsRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  private readonly likeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  // private client = createClient();
  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const client = createClient();
      await client.connect();
      const threadRedis: string = await client.get("thread");
      if (threadRedis) {
        return res.status(200).json({
          message: "success",
          status: 200,
          data: JSON.parse(threadRedis),
        });
      } else {
        const threadData = await this.threadsRepository.find({
          relations: ["user", "replies", "likes"],
          order: {
            id: "DESC",
          },
        });

        const userIdLogin = res.locals.loginSession;

        const newApi = await Promise.all(
          threadData.map(async (thread) => {
            const timeAgo = moment(thread.posted_at).fromNow();

            let isLike: boolean;

            const countLike = await this.likeRepository.count({
              where: {
                userId: userIdLogin.userId,
                threadId: thread.id,
              },
            });

            isLike = countLike > 0;

            return {
              id: thread.id,
              full_name: thread.user.full_name,
              username: thread.user.username,
              content: thread.content,
              image: thread.image,
              replies: thread.replies.length,
              image_profile: thread.user.profile_picture,
              like: thread.likes.length,
              posted_at: thread.posted_at,
              timeAgo,
              isLike: isLike,
            };
          })
        );

        await client.setEx("thread", 2, JSON.stringify(newApi));

        return res.status(200).json({
          message: "success",
          status: 200,
          data: newApi,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        err: error,
        status: 500,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const detailThread = await this.threadsRepository.findOne({
        where: {
          id: Number(id),
        },
        relations: ["user", "replies", "likes"],
      });

      const newTime = moment(detailThread.posted_at).format(
        "HH.mm A . MMM D YYYY"
      );

      const constUserDetail = {
        id: detailThread.user.id,
        username: detailThread.user.username,
        full_name: detailThread.user.full_name,
        profile_picture: detailThread.user.profile_picture,
      };

      const newApi = {
        id: detailThread.id,
        content: detailThread.content,
        user: constUserDetail,
        image: detailThread.image,
        posted_at: newTime,
        countReplies: detailThread.replies.length,
        countLike: detailThread.likes.length,
      };

      return res.status(200).json({
        message: "success",
        status: 200,
        data: newApi,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const dataUploadThread = {
        content: req.body.content,
        image: res.locals.filename,
      };
      const { error, value } = threadSchema.validate(dataUploadThread);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }

      const rabbitMqService = new ThreadWorker();
      await rabbitMqService.init();

      const obj = res.locals.loginSession;
      let scrURL: string;
      if (value.image) {
        scrURL = await cloudinaryConfig.destination(value.image);
      }

      const dataPublished = {
        content: value.content,
        image: scrURL,
        userId: obj.userId,
      };

      await rabbitMqService.sendMessageToQueue(dataPublished);

      const dataConsumed = await rabbitMqService.consumeMessageQueue();

      const dataToJson = JSON.parse(dataConsumed);

      await rabbitMqService.closeConnection();

      const newThread = new Threads();
      newThread.content = dataToJson.content;
      newThread.image = dataToJson.image;
      newThread.userId = dataToJson.userId;

      await this.threadsRepository.save(newThread);

      return res.status(201).json({
        message: "success created",
        status: 201,
        data: newThread,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
        status: 500,
      });
    }
  }

  async deletePost(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.threadsRepository.delete({
        id: Number(id),
      });

      return res.status(200).json({
        message: "success delete",
        status: 200,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async cobaRabbitMQ(req: Request, res: Response): Promise<Response> {
    try {
      // const { name, address } = req.body;

      const data = {
        name: req.body,
        address: req.body,
        image: res.locals.filename,
      };

      const parsingData = {
        name: data.name,
        address: data.address,
        image: data.image,
      };

      // sendMessageToQueue(parsingData);
      // ContohConsumer.consume();

      return res.status(200).json({
        message: "success",
        status: 200,
        data: parsingData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
        status: 500,
      });
    }
  }
})();
