const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response, next) => {
  try {
    return response.status(201).json({ message: "hello" });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
