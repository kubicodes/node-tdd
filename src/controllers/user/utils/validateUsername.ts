import { NextFunction, Request, Response } from "express";

export const validateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("angekommen in validateusername");
  const user = req.body;

  if (user.username === null) {
    req.validationErrors = {
      ...req.validationErrors,
      username: "Username cannot be null",
    };
  }

  next();
};
