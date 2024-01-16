import { Repository } from "typeorm";
import { Follows } from "../entity/Follows";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  followSchema,
  unfollowSchema,
} from "../utils/validators/FollowValidator";
import jwtconfig from "../middleware/auth";

export default new (class FollosService {
  private readonly followsRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);

  async followOnePerson(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = followSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }

      const tokenHeader = req.headers.authorization;

      const decodeJWT = jwtconfig.decode(tokenHeader);

      const { anotherAccount } = value;

      const newFollow = new Follows();
      newFollow.userFollowerId = decodeJWT.userId;
      newFollow.userFollowedId = anotherAccount;

      await this.followsRepository.save(newFollow);

      return res.status(200).json({
        message: "success",
        status: 200,
        data: newFollow,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async seeMYAccountFF(req: Request, res: Response): Promise<Response> {
    try {
      const { myAccount } = req.params;
      const MYAccountRes = await this.followsRepository.find({
        where: {
          userFollowerId: Number(myAccount),
        },
        relations: ["userFollower", "userFollowed"],
      });

      return res.status(200).json({
        message: "success",
        status: 200,
        data: MYAccountRes,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async unfollowOnePerson(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = unfollowSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }

      const tokenHeader = req.headers.authorization;
      const obj = jwtconfig.decode(tokenHeader);
      const { anotherAccount } = value;
      const count = await this.followsRepository.count({
        where: {
          userFollowerId: obj.userId,
          userFollowedId: anotherAccount,
        },
      });

      if (count === 0) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      await this.followsRepository.delete({
        userFollowerId: obj.userId,
        userFollowedId: anotherAccount,
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

  async isFollowByYou(req: Request, res: Response): Promise<Response> {
    try {
      const tokenHeader = res.locals.loginSession;
      const { anotherAcountId } = req.query;
      const response = await this.followsRepository.count({
        where: {
          userFollower: tokenHeader.userId,
          userFollowedId: Number(anotherAcountId),
        },
      });

      if (response === 0) {
        return res.status(200).json({
          data: false,
        });
      }

      return res.status(200).json({
        data: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        status: 500,
      });
    }
  }

  async listFollowers(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;
      const dataFollower = await this.followsRepository.find({
        where: {
          userFollowedId: obj.userId,
        },
        relations: ["userFollower"],
      });

      const follData = await Promise.all(
        dataFollower.map(async (data) => {
          let isFollowing: boolean;

          const countCheck = await this.followsRepository.count({
            where: {
              userFollowerId: obj.userId,
              userFollowedId: data.userFollower.id,
            },
          });

          isFollowing = countCheck > 0;

          return {
            id: data.userFollower.id,
            full_name: data.userFollower.full_name,
            username: data.userFollower.username,
            profile_picture: data.userFollower.profile_picture,
            profile_description: data.userFollower.profile_description,
            isFollowing: isFollowing,
          };
        })
      );

      const filterUserExecptME = follData.filter((user) => {
        return user.id !== obj.userId;
      });

      return res.status(200).json({
        message: "success",
        status: 200,
        data: filterUserExecptME,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        status: 500,
      });
    }
  }

  async listFollowing(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;
      const dataFollower = await this.followsRepository.find({
        where: {
          userFollowerId: obj.userId,
        },
        relations: ["userFollowed"],
      });

      // const follData = await Promise.all(
      //   dataFollower.map((data) => {
      //     let isFollowing: boolean;

      //     const countCheck = await this.followsRepository.count({
      //       where: {
      //         userFollowerId: obj.userId,
      //         userFollowedId: data.userFollower.id,
      //       },
      //     });

      //     isFollowing = countCheck > 0;

      //     return {
      //       id: data.userFollowed.id,
      //       full_name: data.userFollowed.full_name,
      //       username: data.userFollowed.username,
      //       profile_picture: data.userFollowed.profile_picture,
      //       profile_description: data.userFollowed.profile_description,
      //       isFollowing: isFollowing,
      //     };
      //   })
      // );

      const follData = await Promise.all(
        dataFollower.map(async (data) => {
          let isFollowing: boolean;

          const countCheck = await this.followsRepository.count({
            where: {
              userFollowerId: obj.userId,
              userFollowedId: data.userFollowed.id,
            },
          });

          isFollowing = countCheck > 0;

          return {
            id: data.userFollowed.id,
            full_name: data.userFollowed.full_name,
            username: data.userFollowed.username,
            profile_picture: data.userFollowed.profile_picture,
            profile_description: data.userFollowed.profile_description,
            isFollowing: isFollowing,
          };
        })
      );

      const filterUserExecptME = follData.filter((user) => {
        return user.id !== obj.userId;
      });

      return res.status(200).json({
        message: "success",
        status: 200,
        data: filterUserExecptME,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        status: 500,
      });
    }
  }

  // async chekingUser(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const objToken = res.locals.loginSession;
  //     const {anotherAccountID} = req.query;
  //     const responseChecking = await this.followsRepository.count({
  //       where: {
  //         userFollowerId: objToken.userId,
  //         userFollowedId: req.params.id,
  //       },
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: "Internal Server Error",
  //       error: error,
  //       status: 500,
  //     });
  //   }
  // }

  async listIdUserHasFollow(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;
      const dataFollower = await this.followsRepository.find({
        where: {
          userFollowerId: obj.userId,
        },
        relations: ["userFollowed"],
      });

      const follData = dataFollower.map((data) => {
        return {
          id: data.userFollowed.id,
        };
      });

      return res.status(200).json({
        message: "success",
        status: 200,
        data: follData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error,
        status: 500,
      });
    }
  }
})();
