import app from "./app.js";
import logger from "./configs/logger.configs.js";

// env variable
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}...`);
});
