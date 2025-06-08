// Import utils
const middleware = require("./utils/middleware");

// Import controllers
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/user");
const recipeRouter = require("./controllers/recipe");

// Import libraries
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // Allows your port (server) to be reached by other ports (front-end, other users, etc)
app.use(express.json()); // JSON Parser (parses request body to JSON before sending to routes)
app.use(middleware.requestLogger); // Print request to console BEFORE sending

// Implement token extractor below

// Implement routers below
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

// Middlewares executed after requests
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
