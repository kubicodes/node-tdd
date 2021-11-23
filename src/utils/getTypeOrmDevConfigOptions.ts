import { ConnectionOptions } from "typeorm";
import { User } from "../entities/User";

export const getTypeOrmDevConfigOptions = (): ConnectionOptions => {
  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    synchronize: false,
    migrationsRun: true,
    entities: [User],
    migrations: ["dist/migrations/*.js"],
  };
};
