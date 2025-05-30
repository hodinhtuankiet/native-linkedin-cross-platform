import User from "../models/users.js";
import CV from "../models/cv.js";
const webhookBaseURL = process.env.WEBHOOK_URL_PORT;
import "dotenv/config";

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
    // console.log("loggedInuser sau khi populate: ", loggedInuser);
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
const findCandidateByIdPost = async (req, res, next) => {
  try {
    const postId = req.params.postId; // Loại bỏ \n

    // Nếu postId không phải là ObjectId hợp lệ, trả về lỗi
    if (!postId) {
      return res.status(400).json({ message: "Invalid postId format" });
    }

    const candidates = await CV.find({ postId: postId });

    if (!candidates) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    console.log("Error retrieving candidate", error);
    res.status(500).json({ message: "Error retrieving candidate" });
  }
};

const userDescription = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { userDescription } = req.body;

    await User.findByIdAndUpdate(userId, { userDescription });

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error updating user Profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

const analyzeCandidate = async (req, res, next) => {
  const { postId } = req.body;
  try {
    const response = await axios.post(
      // `${webhookBaseURL}/webhook-test/analys`,
      `https://n8n-hirenova.gdsc.dev/webhook-test/analys`,
      postId
    );
    console.log("Webhook response:", response.data);
  } catch (error) {
    console.error("Error sending file to webhook:", error);
    return res
      .status(500)
      .json({ error: "Không thể gửi tệp tới webhook 222", webhookBaseURL });
  }
};

export const userController = {
  findIdByProfile,
  findIdByUserId,
  userDescription,
  findCandidateByIdPost,
  analyzeCandidate,
};
