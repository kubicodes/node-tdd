import { User } from "../../entities/User";
import argon2 from "argon2";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  console.log("req validation errors: ", req.validationErrors);
  if (req.validationErrors) {
    const response = { validationErrors: { ...req.validationErrors } };

    return res.status(400).json(response);
  }

  if (!req.body) {
    const response = { validationErrors: { message: "Body cannot be empty" } };

    return res.status(500).json(response);
  }

  // console.log(req.body);
  const userFromRequestBody = req.body as User;

  const hashedPassword = await argon2.hash(userFromRequestBody.password);

  try {
    const created = await User.create({
      ...userFromRequestBody,
      password: hashedPassword,
    }).save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  return res.status(201).send({ message: "User Created" });
};
