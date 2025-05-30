const express = require("express");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.json());

// Middlewares executed after requests
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
