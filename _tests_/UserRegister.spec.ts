import request from "supertest";
import { createConnection } from "typeorm";
import { User } from "../src/entities/User";
import { app } from "../src/index";
import { getTypeOrmTestConfigOptions } from "../src/utils/getTypeOrmTestConfigOptions";

beforeAll(async () => {
  await createConnection(getTypeOrmTestConfigOptions());
});

describe("User Registration", () => {
  const validUserData = {
    username: "user1",
    email: "user1@user.com",
    password: "12345678",
  };

  const userRequest = (user: Record<string, any>) => {
    console.log("user object in user request ");
    return request(app).post("/api/v1/users").send(user);
  };

  const validUserRequest = () => {
    return request(app).post("/api/v1/users").send(validUserData);
  };

  it("returns status code 200 when signup request is valid", async () => {
    const response = await validUserRequest();

    expect(response.status).toBe(201);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await validUserRequest();

    const lowerCaseBodyMessage = (
      response.body?.message as string
    ).toLocaleLowerCase();

    expect(lowerCaseBodyMessage).not.toBeUndefined();
    expect(lowerCaseBodyMessage).not.toContain("error");
  });

  it("saves the user to the database", async () => {
    const userList = await User.find({});
    expect(userList.length).toBe(1);
  });

  it("saves the username and email to database", async () => {
    await validUserRequest();
    const savedUser: User = (await User.find({}))[0];

    expect(savedUser.username).toEqual(validUserData.username);
    expect(savedUser.email).toEqual(validUserData.email);
  });

  it("hashes the password before db insert", async () => {
    await validUserRequest();
    const savedUser: User = (await User.find({}))[0];

    expect(savedUser.password).not.toEqual(validUserData.password);
  });

  it("returns error when E-Mail and Username are null", async () => {
    const response = await userRequest({
      username: null,
      email: null,
      password: "testpassword",
    });

    expect(Object.keys(response.body.validationErrors)).toEqual([
      "email",
      "username",
    ]);
  });
});
