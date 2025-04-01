const connectionRequestModel = require("../models/connectionRequests");
const User = require("../models/user");

const sendConnectionRequest = async (req, res) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.toUserId;
    const fromUserId = req.user._id;

    //api validations
    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const checkRequestExistOrNot = await connectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (checkRequestExistOrNot) {
      return res
        .status(400)
        .json({ message: "Connection request already exist." });
    }
    //

    const connectionRequest = new connectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const result = await connectionRequest.save();
    let message = `${req.user.firstName} interested in ${toUser.firstName}.`;
    if (status == "ignored") {
      message = `${req.user.firstName} has ignored ${toUser.firstName}.`;
    }
    res.json({
      data: result,
      status: 201,
      message,
    });
  } catch (error) {
    res.json({ data: {}, status: 400, message: error.message });
  }
};

const reviewConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const connectionRequest = await connectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    let message = "Connection request accepted successfully.";
    if (status == "rejected") {
      message = "Connection request rejected successfully.";
    }
    res.json({ data, message });
  } catch (error) {
    res.status(400).json({ message: "ERROR" + error });
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
