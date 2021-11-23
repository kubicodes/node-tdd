declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_NAME_TEST: string;
  }
}
