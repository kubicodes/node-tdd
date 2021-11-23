import "dotenv-safe/config";
import express from "express";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import routes from "./routers";
import { getTypeOrmDevConfigOptions } from "./utils/getTypeOrmDevConfigOptions";
import { getTypeOrmTestConfigOptions } from "./utils/getTypeOrmTestConfigOptions";

export const app = express();

const main = async () => {
  await createConnection(getTypeOrmDevConfigOptions());

  app.use(express.json());
  app.use(routes);

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main().catch((error) => console.log(error));
