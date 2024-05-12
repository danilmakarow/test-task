import express from "express";
import { configDotenv } from "dotenv";
import swaggerUi from "swagger-ui-express";
import { router } from "./routing/router.js";
import { Routes } from "./constants/routes.js";
import { AppDefaultConfig } from "./constants/app-default-config.js";
import swaggerDocument from "../swagger.json" with { type: "json" };

configDotenv();

const app = express();

app.use(express.json());
app.use(Routes.API_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router(app);

const port = process.env.PORT || AppDefaultConfig.PORT;
const host = process.env.APP_HOST || AppDefaultConfig.HOST;

app.listen(port, host, () => {
  console.log(`Launched http://${host}:${port}`);
  console.log(`Swagger  http://${host}:${port}${Routes.API_DOCS}`);
});
