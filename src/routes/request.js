const express = require('express')
const { userAuth } = require("../middlewares/auth");


const requestRouter = express.Router()

requestRouter.post("/connectionRequest", userAuth, async (req, res) => {
  try {
    console.log("here");
    res.send("testing");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = requestRouter