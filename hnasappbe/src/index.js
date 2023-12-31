import app from "./app.js";
import logger from "./configs/logger.configs.js";
import mongoose from "mongoose";
// env variable
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

// mongoose connection
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  logger.info("Connected to mongoDB.");
});

// handle connect mongoose errors
mongoose.connection.on("error", (err) => {
  logger.error(`mongoDB connection error: ${err}`);
  process.exit(1);
});

// mongoose debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

let server;

server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}...`);
  console.log("process id", process.pid);
});

// handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed!");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed!");
    process.exit(1);
  }
});
