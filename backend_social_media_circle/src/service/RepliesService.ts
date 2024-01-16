import { Replies } from "../entity/Replies";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { repliesSchema } from "../utils/validators/RepliesValidators";
import moment from "moment";

export default new (class RepliesService {
  private readonly repliesRepository = AppDataSource.getRepository(Replies);

  async findAllReplieByThread(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId } = req.query;
      const resReplies = await this.repliesRepository.find({
        where: { threadId: Number(threadId) },
        relations: ["user", "thread"],
        order: { createdAt: "DESC" },
      });

      const customReplies = resReplies.map((replies) => {
        const timeAgo = moment(replies.createdAt).fromNow();
        return {
          id: replies.id,
          content: replies.content,
          user: {
            id: replies.user.id,
            username: replies.user.username,
            full_name: replies.user.full_name,
            profile_picture: replies.user.profile_picture,
          },
          repliesAt: timeAgo,
        };
      });
      return res.status(200).json({
        message: "success",
        status: 200,
        data: customReplies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async createReplies(req: Request, res: Response): Promise<Response> {
    try {
      const tokenObj = res.locals.loginSession;
      const { error, value } = repliesSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }
      const { content, threadId } = value;
      const newReplies = new Replies();
      newReplies.content = content;
      newReplies.userId = tokenObj.userId;
      newReplies.threadId = threadId;
      await this.repliesRepository.save(newReplies);
      return res.status(201).json({
        message: "success created",
        status: 201,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async deleteReplies(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.repliesRepository.delete({
        id: Number(id),
      });

      return res.status(200).json({
        message: "success deleted",
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
