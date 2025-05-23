const express = require('express')
const { userAuth } = require("../middlewares/auth");
const { sendConnectionRequest, reviewConnectionRequest } = require('../controller/connectionRequestController');


const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, sendConnectionRequest);

requestRouter.post("/request/review/:status/:requestId", userAuth, reviewConnectionRequest);

module.exports = requestRouter