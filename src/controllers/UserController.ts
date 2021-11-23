import { User } from "../entities/User";
import argon2 from "argon2";

export const registerUser = async (req: any, res: any) => {
  if (!req.body) {
    return res.status(500).json({ message: "error" });
  }

  const userFromRequestBody: User = req.body;
  const hashedPassword = await argon2.hash(userFromRequestBody.password);

  try {
    await User.create({
      ...userFromRequestBody,
      password: hashedPassword,
    }).save();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  return res.status(201).send({ message: "User Created" });
};
