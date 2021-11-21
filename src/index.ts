import express from "express";
import "dotenv-safe/config";

const main = () => {
  const app = express();

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main();
