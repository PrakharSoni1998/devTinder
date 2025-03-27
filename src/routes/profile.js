const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  getUserProfile,
  editUserProfile,
  updateUserPassword,
} = require("../controller/profileController");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, getUserProfile);

profileRouter.patch("/profile/edit", userAuth, editUserProfile);

profileRouter.patch("/profile/password", userAuth, updateUserPassword);

module.exports = profileRouter;
