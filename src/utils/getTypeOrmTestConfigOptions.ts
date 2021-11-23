import { ConnectionOptions } from "typeorm";
import { User } from "../entities/User";

export const getTypeOrmTestConfigOptions = (): ConnectionOptions => {
  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dropSchema: true,
    logging: false,
    synchronize: false,
    migrationsRun: true,
    database: process.env.DB_NAME_TEST,
    entities: [User],
    migrations: ["dist/migrations/*.js"],
  };
};
