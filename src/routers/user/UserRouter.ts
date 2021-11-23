import { Router } from "express";
import { registerUser } from "../../controllers/UserController";
const userRouter = Router();

userRouter.post("/", registerUser);

export default userRouter;
