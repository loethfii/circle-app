import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();
interface ValidationRequest extends Request {
  userData?: {
    userId: number;
    username: string;
  };
}
export default new (class jwtConfig {
  generateToken(userId: number, username: string, fullName: string): string {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId, username, fullName }, secretKey, {
      expiresIn: "30d",
    });
    return token;
  }

  AccessValidation(
    req: ValidationRequest,
    res: Response,
    next: NextFunction
  ): any {
    const Authorization = req.headers.authorization as string;

    if (Authorization === "")
      return res.status(401).json({ message: "need token" });

    if (!Authorization) {
      return res.status(401).json({ Error: "Unauthorized" });
    }

    const token = Authorization.startsWith("Bearer ")
      ? Authorization.split(" ")[1]
      : Authorization;

    // const token = Authorization;
    const secret = process.env.SECRET_KEY as string;

    try {
      const loginSession = jwt.verify(token, secret);
      res.locals.loginSession = loginSession;
      next();
    } catch (error) {
      return res.status(500).json({ Error: "Error while authenticating" });
    }
  }

  decode(reqHeader: string): any {
    let token = reqHeader;

    // Periksa apakah token memiliki "Bearer " di depannya
    const parts = reqHeader.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }

    try {
      const decodedJWT = jwt.decode(token);
      return decodedJWT;
    } catch (error) {
      // Tangani kesalahan dekode JWT di sini
      console.error("Error decoding JWT:", error);
      throw new Error("Failed to decode JWT");
    }
  }
})();
