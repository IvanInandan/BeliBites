const loginRouter = require("express").Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    // Use compare function to check password arg with stored passwordHash
    const correctPassword =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    // If user does not exist or password is wrong, return failure
    if (!(user && correctPassword)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    // Generate object for token (reason not passing whole user is because we don't want to include all info. username + id is fine)
    // --> more chance for info leak if all is included
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    // Sign object with secret key to generate token
    const token = jwt.sign(userForToken, process.env.SECRET);

    return response.status(200).json({
      token,
      username: user.username,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
