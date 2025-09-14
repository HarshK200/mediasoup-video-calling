import { Router } from "express";
import jwt from "jsonwebtoken";
import generateRandomAnimal from "random-animal-name";
import { authMiddleware } from "./middlewares/auth";

// V1 Router
export function createV1Router() {
  // TODO: move this to a load file
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("No jwt secret provided");
  }

  const v1Router = Router();

  // health check route
  v1Router.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

  // login the user as guest and return a signed jwt
  v1Router.post("/guest-login", (req, res) => {
    try {
      const guest_username = generateRandomAnimal();
      const jwt_token = jwt.sign({ username: guest_username }, jwt_secret);

      res.cookie("jwt_token", jwt_token);
      return res.status(200).json({ msg: "Login Successfull" });
    } catch (e) {
      console.error("Error in guest-login:\n", e);
      return res.status(500).json({ msg: "Internal server error" });
    }
  });

  // route to create stream
  v1Router.post("/create-stream", authMiddleware, (req, res) => {
    try {
      // TODO:
      // 1. create a stream object instance and push it to the streams array
      // 2. get a mediasoup worker using the getMediasoupWorker() function i implemented
      // 3. create a router managed by that worker
      // 4. Now on the client side the user should be redirected to stream/:id route
      // which makes a ws connection to the signalling server(which is not implemented yet)

      return res
        .status(200)
        .json({ msg: "test", username: req.body.username! });
    } catch (e) {
      console.error("Error in create-stream:\n", e);
      return res.status(500).json({ msg: "Internal server error" });
    }
  });

  return v1Router;
}
