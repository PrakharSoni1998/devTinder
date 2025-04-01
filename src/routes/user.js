const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  getConnectionRequestOfUser,
  getConnectionOfUser,
  userFeed,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, getConnectionRequestOfUser);

userRouter.get("/user/connections", userAuth, getConnectionOfUser);

userRouter.get("/feed", userAuth, userFeed);

module.exports = userRouter;
