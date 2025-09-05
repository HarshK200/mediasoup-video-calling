import Express from "express";
import { createV1Router } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

export function CreateExpressServer() {
  const app = Express();

  // middlewares
  app.use(Express.json());
  app.use(cookieParser());
  app.use(cors());

  // mounting routes
  app.use("/v1", createV1Router());

  return app;
}
