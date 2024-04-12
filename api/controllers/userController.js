import User from "../models/users.js";

const findIdByProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};
// Aims to retrieve users who are not connected of your account
const findIdByUserId = async (req, res, next) => {
  try {
    const loggedInUserId = req.params.userId;

    //fetch the logged-in user's connections
    const loggedInuser = await User.findById(loggedInUserId).populate(
      "connections",
      "_id"
    );
    console.log("loggedInuser sau khi populate: ", loggedInuser);
    if (!loggedInuser) {
      return res.status(400).json({ message: "User not found" });
    }

    // results in an array of _id values representing the connected users
    const connectedUserIds = loggedInuser.connections.map(
      (connection) => connection._id
    );

    //find the users who are not connected to the logged-in user Id
    const users = await User.find({
      // $ne operator means "not equal to"
      // $nin operator means "not in"
      _id: { $ne: loggedInUserId, $nin: connectedUserIds },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error retrieving users", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const userController = {
  findIdByProfile,
  findIdByUserId,
};
