import express from "express";
import "dotenv-safe/config";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";

const main = async () => {
  const app = express();

  const connection = await createTypeOrmConnection();
  await connection.runMigrations();

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main().catch((error) => console.log(error));
