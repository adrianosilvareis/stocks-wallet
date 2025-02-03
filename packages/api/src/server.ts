import { Router } from "express";
import { getEnvOrDefault } from "packages/core";
import { app } from "./config/express.config";
import { setup } from "./wallet/setupWallet";

const router = Router();

setup(router);

app.use(router);

const SERVER_PORT = Number(getEnvOrDefault("SERVER_PORT", "3000"));

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
