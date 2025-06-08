const bcrypt = require("bcryptjs");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.get("/check-username", async (request, response, next) => {
  const { username } = request.query;
  const users = await User.find({ username });

  if (users.length < 1) return response.status(200).json({ unique: "true" });
  else return response.status(200).json({ unique: "false" });
});

userRouter.get("/check-email", async (request, response, next) => {
  const { email } = request.query;
  const users = await User.find({ email });

  if (users.length < 1) return response.status(200).json({ unique: "true" });
  else return response.status(200).json({ unique: "false" });
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    response.json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, email, password } = request.body;
    console.log(username, email, password);

    // Generate password hash using bcryptjs library
    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({
      username,
      email,
      passwordHash,
    });

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
