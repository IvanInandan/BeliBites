const userRouter = require("express").Router();

userRouter.post("/", async (request, response, next) => {
  try {
    const user = request.body;
    return response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
