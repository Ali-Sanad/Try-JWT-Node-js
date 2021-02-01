const express = require("express");

//model
const User = require("../models/user");

//token
const jwt = require("jsonwebtoken");

const authenticationMiddleware = require("../middlewares/authentication");

//router
const userRouter = new express.Router();

const bcrypt = require("bcrypt");
const { Error } = require("mongoose");

//base path /api/users
//register a new user
userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 7);
    const user = await User.create({ username, password: hash });
    res.statusCode = 201;
    res.send(user);
  } catch (err) {
    res.statusCode = 422;
    res.send({ success: false, message: "Registeration failed, try again" });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user) throw new Error("wrong username or password");
    const isMatched = await bcrypt.compare(
      password,
      user.password /*hashed password in DB*/
    );
    if (!isMatched) throw new Error("wrong username or password");

    //generate token And send it to the user
    const token = jwt.sign({ id: user.id }, "my-signing-secret");
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.statusCode = 422;
    res.json({ success: false, message: err.message });
  }
});

///////authentication middleware
userRouter.use(authenticationMiddleware); //all below routes must be authenticated by  authenticationMiddleware

//get user profile
userRouter.get("/profile", async (req, res) => {
  const user = await User.findOne({ _id: req.signedData.id }, { password: 0 });
  res.send(user);
});

module.exports = userRouter;
