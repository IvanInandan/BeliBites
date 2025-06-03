const userRouter = require("express").Router();

userRouter.post("/", async (request, response, next) => {
  try {
    console.log("Register receieved");
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
