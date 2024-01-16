import { NextFunction, Request, Response } from "express";
import multer from "multer";

export default class multerConfig {
  private fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
      const unixSuffix = Date.now();
      cb(null, file.fieldname + "-" + unixSuffix + ".png");
    },
  });

  private uploadFile = multer({ storage: this.storage });

  public handleUpload(req: Request, res: Response, next: NextFunction) {
    this.uploadFile.single(this.fieldName)(req, res, (err: any) => {
      if (err) return res.status(400).json({ err });

      res.locals.filename = req.file?.filename;
      next();
    });
  }
}
