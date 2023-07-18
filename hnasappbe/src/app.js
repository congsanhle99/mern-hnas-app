import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

// dotenv config
dotenv.config();

// create express app
const app = express();

// morgan middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// helmet middleware
app.use(helmet());

// parse json req body
app.use(express.json());

// parse json req url
app.use(
  express.urlencoded({
    extended: true,
  })
);

// mongoSanitize request data
app.use(mongoSanitize());

// cookie-parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload
app.use(
  fileUpload(
    fileUpload({
      useTempFiles: true,
    })
  )
);

// cors
app.use(
  cors({
    // origin: "http://localhost:3000/",
  })
);

// route api v1
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello from server!");
  throw createHttpError.BadRequest("This route has an Error!");
});

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route has not exit!"));
});

// handle http errors
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
