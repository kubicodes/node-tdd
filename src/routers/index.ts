import { Router } from "express";
import userRouter from "./user/UserRouter";

const routes = Router();

routes.use("/api/v1/users", userRouter);

export default routes;
