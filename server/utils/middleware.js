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

// If authoriation header exists in request, grab the token from it and assign it to token arg
const tokenExtractor = (request, response, next) => {
  // Grab "authorization" in request header and set to authorization variable
  const authorization = request.get("Authorization");

  // If authorization exists and starts with 'Bearer ____'
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", ""); // Remove 'Bearer ' sub-string and remain with token (ie: 'Bearer [token])
  } else {
    request.token = null; // Else do nothing
  }

  next();
};

const tokenDecoder = (request, response, next) => {
  // Decode token header and see if valid. If token is invalid, error is caught and passed to errorHandler middleware
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: "token does not contain user information" });
  }

  request.user = decodedToken;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  tokenDecoder,
};
