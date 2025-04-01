const connectionRequestModel = require("../models/connectionRequests");
const User = require("../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoURL",
  "about",
  "age",
  "gender",
];

const getConnectionRequestOfUser = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);

    res.json({
      data: connectionRequests,
      message: "Connection request fetch successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error.message });
  }
};

const getConnectionOfUser = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });
    res.json({ data });
  } catch (error) {
    res.status(400).message("Errro " + error.message);
  }
};

const userFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const userConnectionRequest = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select(["fromUserId", "toUserId"]);

    let hideUserIds = new Set();
    userConnectionRequest.forEach((request) => {
      hideUserIds.add(request.fromUserId.toString());
      hideUserIds.add(request.toUserId, toString());
    });

    const userData = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUserIds) },
        },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
      data: userData,
      status: 200,
      message: "Feed data fetched successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getConnectionRequestOfUser,
  getConnectionOfUser,
  userFeed,
};
