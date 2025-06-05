require("dotenv").config();

const app = require("./app");
const connectToDatabase = require("./utils/db");
const config = require("./utils/config");
const logger = require("./utils/logger");

const main = async () => {
  try {
    await connectToDatabase();
    app.listen(config.PORT, () => {
      logger.info(`index.js -- server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to database: ", error);
    process.exit(1);
  }
};

main();
