import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // TODO: move this to a load file
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("No jwt secret provided");
    }

    const jwt_token = req.cookies["jwt_token"] as undefined | string;
    if (!jwt_token) {
      return res.status(401).json({ msg: "Jwt token not provided" });
    }

    const jwt_payload = jwt.verify(jwt_token, jwt_secret) as {
      username: string;
    };

    // set that to req-body
    if (!req.body) {
      req.body = { username: jwt_payload.username };
    } else {
      req.body.username = jwt_payload.username;
    }

    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: "jwt token expired" });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ msg: "invalid jwt token", error: e.message });
    } else {
      console.error("Error in auth-middleware:\n", e);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
}
