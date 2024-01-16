import ThreadsController from "../controller/ThreadsController";
import { Router } from "express";
import multerConfig from "../middleware/multer";
import auth from "../middleware/auth";

const uploadImage = new multerConfig("image");

const routerThread = Router();
// asdasldjalsdj

// asdasd
routerThread.get("/threads", auth.AccessValidation, ThreadsController.findAll);
routerThread.get(
  "/detail-thread/:id",
  auth.AccessValidation,
  ThreadsController.findOne
);
routerThread.post(
  "/post-thread",
  auth.AccessValidation,
  uploadImage.handleUpload.bind(uploadImage),
  ThreadsController.create
);
routerThread.delete(
  "/delete-thread/:id",
  auth.AccessValidation,
  ThreadsController.deletePost
);
routerThread.post(
  "/rabbit-mq",
  uploadImage.handleUpload.bind(uploadImage),
  ThreadsController.cobaRabbitMQ
);

export default routerThread;
