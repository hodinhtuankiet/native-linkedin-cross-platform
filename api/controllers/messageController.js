import Post from "../models/post.js";

import mongoose from "mongoose";
import User from "../models/users.js";
import Message from "../models/message.js";

const sendMessage = async (req, res, next) => {
  try {
    // senderId, recepientId, messageType, messageText matches with formData.append ChatMessage
    const { senderId, recepientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" ? req.file.path : null,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const fetchMessageBetweenTwoPeople = async (req, res, next) => {
  try {
    const { senderId, recepientId } = req.params;
    // $or It searches for messages where
    const messages = await Message.find({
      // tìm kiếm trong cơ sở dữ liệu những tin nhắn mà senderId hoặc recepientId trùng khớp
      // với senderId và recepientId từ request hoặc ngược lại.
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
      // vì senderId trong model có ref đến User
      // nên populate field senderId với _id và name của Model User
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(500).json({ message: null });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const messageController = {
  sendMessage,
  fetchMessageBetweenTwoPeople,
  deleteMessage,
};
