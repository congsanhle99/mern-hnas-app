import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

export default app;
