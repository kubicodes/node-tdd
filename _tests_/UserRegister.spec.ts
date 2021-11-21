import { app } from "../src/index";
import { createTypeOrmConnection } from "../src/utils/createTypeOrmConnection";
import * as request from "supertest";

beforeAll(async () => {
  await createTypeOrmConnection();
});

describe("User Registration", () => {
  const validUserRequest = () => {
    return request(app).post("/api/v1/users").send({
      username: "user1",
      email: "user1@user.com",
      password: "12345678",
    });
  };

  it("returns status code 200 when signup request is valid", async () => {
    const response = await validUserRequest();

    expect(response.status).toBe(200);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await validUserRequest();

    expect(response.body?.message).not.toBeUndefined();
  });
});
