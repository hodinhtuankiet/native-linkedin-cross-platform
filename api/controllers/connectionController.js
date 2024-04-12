import User from "../models/users.js";

const requestConnection = async (req, res, next) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    await User.findByIdAndUpdate(selectedUserId, {
      $push: { connectionRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentConnectionRequests: selectedUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error creating connection request" });
  }
};
//endpoint to show all the connections requests
const showAllRequestConnections = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("connectionRequests", "name email profileImage")
      .lean();

    const connectionRequests = user.connectionRequests;

    res.json(connectionRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const showAllRequestConnectionsAccept = async (req, res, next) => {
  try {
    const { senderId, recepientId } = req.body;
    // Find the sender and recipient users by their IDs
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);
    // Update connections for both users by adding each other's IDs
    sender.connections.push(recepientId);
    recepient.connections.push(senderId);
    // Remove the request from recipient's connection requests list
    recepient.connectionRequests = recepient.connectionRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );
    // Remove the request from sender's sent connection requests list
    sender.sentConnectionRequests = sender.sentConnectionRequests.filter(
      (request) => request.toString() !== recepientId.toString()
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend request acccepted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const connectionController = {
  requestConnection,
  showAllRequestConnections,
  showAllRequestConnectionsAccept,
};
