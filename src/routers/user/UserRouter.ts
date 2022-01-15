import { Router } from "express";
import { registerUser } from "../../controllers/user/UserController";
import { validateEmail } from "../../controllers/user/utils/validateEmail";
import { validateUsername } from "../../controllers/user/utils/validateUsername";
const userRouter = Router();

userRouter.post("/", validateEmail, validateUsername, registerUser);

export default userRouter;
