const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

// next(error) skips this middleware in catch blocks due to params format. This is only called when no valid route is found (/api/unkown)
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// When an error is caught in a catch block and sent using next(error), it goes here due to the params format.
const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  } else if (err.message.includes("duplicate key error")) {
    return res
      .status(400)
      .send({ error: "expected `username` and `email` to be unique" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(400).send({ error: "token is invalid or missing" });
  }

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
