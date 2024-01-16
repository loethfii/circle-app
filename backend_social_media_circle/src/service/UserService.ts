import { Users } from "../entity/User";
import { AppDataSource } from "../data-source";
import { ILike, Like, Repository } from "typeorm";
import { Request, Response } from "express";
import BcryptConfig from "../utils/bcrypt";
import jwtConfig from "../middleware/auth";
import {
  userSchemaLogin,
  userSchemaRegister,
  userUpdateSchema,
} from "../utils/validators/UserValidators";
import { Err, object } from "joi";
import { Follows } from "../entity/Follows";
import cloudinaryConfig from "../middleware/cloudinary";
import UserRedis from "../libs/redis/UserRedis";

export default new (class UserService {
  private readonly userRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  private readonly followsRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);

  // private redisClient = createClient();
  // private client = this.redisClient.connect();

  // constructor() {
  //   this.redisClient.on("error", (err) => {
  //     console.error("Redis Client Error:", err);
  //   });
  // }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const userData = await this.userRepository.find({
        relations: ["threads", "followers", "followed"],
        order: {
          id: "DESC",
        },
      });

      await UserRedis.sendToRedis(userData);
      const jsonData = await UserRedis.getDataRedis();
      return res.status(200).json({
        message: "success",
        status: 200,
        data: jsonData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const detailUser = await this.userRepository.findOne({
        where: {
          id: Number(id),
        },
        relations: ["threads", "followers", "followed"],
      });

      if (!detailUser) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      return res.status(200).json({
        message: "success",
        status: 200,
        data: detailUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }
  //Register User
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userSchemaRegister.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }

      const image = res.locals?.filename;

      const doHash = new BcryptConfig();

      const isEmailAlreadyExist = await this.userRepository.count({
        where: {
          email: value.email,
        },
      });

      const isUsernameAlreadyExist = await this.userRepository.count({
        where: {
          username: value.username,
        },
      });

      if (isUsernameAlreadyExist > 0) {
        return res.status(400).json({
          message: "Username already exist",
          status: 400,
        });
      }

      if (isEmailAlreadyExist > 0) {
        return res.status(400).json({
          message: "Email already exist",
          status: 400,
        });
      }

      const hashedPassword = await doHash.hashPassword(value.password);

      let imageFirst: string;

      !image
        ? (imageFirst =
            "https://res.cloudinary.com/dp3rsk2xa/image/upload/f_auto,q_auto/v3nokqg5aj7wvvpb1kde")
        : (imageFirst = image);

      const newUser = new Users();
      newUser.username = value.username;
      newUser.full_name = value.full_name;
      newUser.email = value.email;
      newUser.password = hashedPassword;
      newUser.profile_picture = imageFirst;
      newUser.profile_description = value.profile_description;

      await this.userRepository.save(newUser);

      return res.status(201).json({
        message: "success created",
        status: 201,
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;
      // const { username, full_name, email, profile_description } = req.body;

      const { error, value } = userUpdateSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }

      const newUpdateData = new Users();
      newUpdateData.username = value.username;
      newUpdateData.full_name = value.full_name;
      newUpdateData.profile_description = value.profile_description;

      await this.userRepository.update({ id: obj.userId }, newUpdateData);

      return res.status(200).json({
        message: "success",
        status: 200,
        data: newUpdateData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async detailFollowAndFollower(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const objToken = res.locals.loginSession;

      const detailUser = await this.userRepository.findOne({
        where: {
          id: objToken.userId,
        },
        relations: ["followers", "followed"],
      });

      if (!detailUser) {
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });
      }

      const customeApiRes = {
        id: detailUser.id,
        username: detailUser.username,
        full_name: detailUser.full_name,
        email: detailUser.email,
        profile_picture: detailUser.profile_picture,
        profile_description: detailUser.profile_description,
        followers: detailUser.followers.length,
        following: detailUser.followed.length,
      };

      return res.status(200).json({
        message: "success",
        status: 200,
        data: customeApiRes,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = userSchemaLogin.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          status: 400,
        });
      }
      const { email, password } = value;
      const checkEmail = await this.userRepository.findOne({
        where: {
          email,
        },
        relations: ["followers", "followed"],
      });

      if (!checkEmail) {
        return res.status(404).json({
          message: "username or password wrong",
          status: 404,
        });
      }

      const doHash = new BcryptConfig();

      const isRight = doHash.comparePassword(password, checkEmail.password);

      if (!isRight) {
        return res.status(404).json({
          message: "username or password wrong",
          status: 404,
        });
      }

      const token = jwtConfig.generateToken(
        checkEmail.id,
        checkEmail.username,
        checkEmail.full_name
      );

      return res.status(200).json({
        message: "success",
        status: 200,
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        status: 500,
      });
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const obj = res.locals.loginSession;

      return res.status(200).json({
        message: "success",
        status: 200,
        data: obj,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      await this.userRepository.delete(req.params.id);
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

  async sugestedUser(req: Request, res: Response): Promise<Response> {
    try {
      const objToken = res.locals.loginSession;

      const sugestedUser = await this.userRepository.find({
        order: { created_at: "DESC" },
        take: 100,
      });

      const followByMe = await this.followsRepository.find({
        where: {
          userFollowerId: objToken.userId,
        },
      });

      const filterUserExecptME = sugestedUser.filter((user) => {
        return user.id !== objToken.userId;
      });

      const execptHasFollowByMe = filterUserExecptME.filter((user) => {
        return !followByMe.some((follow) => follow.userFollowedId === user.id);
      });

      const shuffledUsers = execptHasFollowByMe.sort(() => Math.random() - 0.5);

      const suggestedRandomUsers = shuffledUsers.slice(0, 5);

      const newUser = suggestedRandomUsers.map((user) => {
        return {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          profile_picture: user.profile_picture,
        };
      });

      res.status(200).json({
        message: "success",
        status: 200,
        data: newUser,
      });
    } catch (error) {
      return res.status(200).send({
        status: 200,
        message: error,
      });
    }
  }

  async updateFoto(req: Request, res: Response): Promise<Response> {
    try {
      const objToken = res.locals.loginSession;

      const imageProfile = res.locals?.filename;

      // const image = res.locals?.filename;

      let scrURL: string;

      if (imageProfile) {
        scrURL = await cloudinaryConfig.destination(imageProfile);
      }

      const newImage = new Users();
      newImage.profile_picture = scrURL;

      await this.userRepository.update(objToken.userId, newImage);

      return res.status(200).json({
        message: "success",
        status: 200,
        data: newImage.profile_picture,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error,
        status: 500,
      });
    }
  }

  async searchUser(req: Request, res: Response): Promise<Response> {
    try {
      const { searchData } = req.query;
      const data = await this.userRepository.find({
        where: { full_name: ILike(`%${searchData}%`) },
      });

      const newData = await Promise.all(
        data.map(async (user) => {
          let isFollowing: boolean;

          const countCheck = await this.followsRepository.count({
            where: {
              userFollowerId: res.locals.loginSession.userId,
              userFollowedId: user.id,
            },
          });

          isFollowing = countCheck > 0;

          return {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            profile_picture: user.profile_picture,
            isFollowing: isFollowing,
          };
        })
      );

      res.status(200).json({
        message: "success",
        status: 200,
        data: newData,
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
