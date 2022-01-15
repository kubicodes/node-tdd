import { NextFunction, Response, Request } from "express";

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  console.log("user : ", user);
  if (user.email === null) {
    req.validationErrors = {
      ...req.validationErrors,
      email: "Email cannot be null",
    };
  }

  next();
};
