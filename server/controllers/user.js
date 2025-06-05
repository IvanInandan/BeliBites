const userRouter = require("express").Router();

userRouter.get("/", async (request, response, next) => {
  return response.status(201).json({ message: "You made it!" });
});

userRouter.post("/", async (request, response, next) => {
  try {
    const user = request.body;
    return response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
