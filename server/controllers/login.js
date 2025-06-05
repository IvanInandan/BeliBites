const loginRouter = require("express").Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    console.log(username, password);
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
