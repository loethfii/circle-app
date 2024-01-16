import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import routerThread from "./router/ThreadsRouter";
import routerUser from "./router/UserRouter";
import routerReplies from "./router/RepliesRouter";
import followsRouter from "./router/FollowsRouter";
// import routerThread from "./router/ThreadsRouter";
import cors from "cors";
import cek from "./router/FollowsRouter";
import likeRouter from "./router/LikeRouter";
const app = express();
import * as dotenv from "dotenv";
import cloudinary from "./middleware/cloudinary";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
const sdocument = require("./json/user.json");
import path from "path";
// console.log(path.dirname(__dirname));
const currentDir = path.dirname(__dirname);
const srcDirectory = path.join(currentDir, "src");

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();
    app.use(express.json());
    app.use(cors());
    app.use("/api/v1", routerThread);
    app.use("/api/v1", routerUser);
    app.use("/api/v1", likeRouter);
    app.use("/api/v1", routerReplies);
    app.use("/api/v1", followsRouter);
    app.get("/users", async (req: Request, res: Response) => {});
    app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(sdocument));
    cloudinary.upload();
    app.listen(3000, () =>
      console.info("Server started at http://localhost:3000")
    );
  })
  .catch((error) => console.error(error));
