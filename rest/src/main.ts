import express from "express";
import { configDotenv } from "dotenv";
import swaggerUi from "swagger-ui-express";
import { router } from "./routing/router";
import { Routes } from "./constants/routes";
import { AppDefaultConfig } from "./constants/app-default-config";
import swaggerDocument from "../swagger.json";

configDotenv();

const app = express();

app.use(express.json());
app.use(Routes.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router(app);

const port = Number(process.env.PORT) || AppDefaultConfig.PORT;
const host = process.env.APP_HOST || AppDefaultConfig.HOST;

app.listen(port, host, () => {
  console.log(`Launched http://${host}:${port}`);
  console.log(`Swagger  http://${host}:${port}${Routes.API_DOCS}`);
});
