import Post from "../models/post.js";

import mongoose from "mongoose";
import User from "../models/users.js";
import Message from "../models/message.js";

const sendMessage = async (req, res, next) => {
  try {
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
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const messageController = {
  sendMessage,
  fetchMessageBetweenTwoPeople,
};
