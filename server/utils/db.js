const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

const connectToDatabase = async () => {
  // Define URL from config util
  const url = config.MONGODB_URI;
  console.log("db.js -- connecting to: ", url);

  // Connect to MongoDB
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    logger.info("db.js -- connected to mongoDB");
  } catch (error) {
    logger.error("db.js -- error connecting to mongoDB", error);
    throw error;
  }
};

module.exports = connectToDatabase;
