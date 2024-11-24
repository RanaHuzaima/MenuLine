import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import { CustomError } from "./utils";
import bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  Credential: true,
};
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      statusCode: statusCode,
      message:
        err instanceof CustomError ? err.message : "Internal Server Error",
    });
  },
);

export default app;
