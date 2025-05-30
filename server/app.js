const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");

const app = express();

app.use(cors()); // Allows your port (server) to be reached by other ports (front-end, other users, etc)
app.use(express.json()); // JSON Parser (parses request body to JSON before sending to routes)
app.use(middleware.requestLogger); // Print request to console BEFORE sending

// Implement token extractor below

// Implement routers below

// Middlewares executed after requests
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
