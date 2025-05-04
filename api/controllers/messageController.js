import axios from 'axios';
import fs from 'fs';
import mongoose from 'mongoose';
import FormData from 'form-data';  // Import FormData cho việc gửi tệp
import Post from "../models/post.js"; // Nếu bạn sử dụng mô hình này
import User from "../models/users.js"; // Nếu bạn sử dụng mô hình này
import Message from "../models/message.js"; // Mô hình Message
import Applicant from "../models/applicant.js"; // Mô hình Applicant
import { console } from 'inspector';
import "dotenv/config";
const webhookBaseURL = process.env.WEBHOOK_URL_PORT;

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

const sendPDF = async (req, res, next) => {
  try {
    // Lấy các tham số từ body (dữ liệu được gửi qua formData)
    const { fullName, email, phone,userId, postId, ownerId } = req.body;
    console.log("userId", userId);
    console.log("postId", postId);
    console.log("ownerId", ownerId);

    const file = req.file;  // Lấy file từ formData

    if (!file) {
      return res.status(400).json({ error: "CV file is required" });
    }

    const newApplicant = new Applicant({
      userId,
      fullName,
      email,
      phone,
      cv: {
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
      },
    });

    await newApplicant.save();

    const formData = new FormData();
    formData.append("userId", userId);  // Thêm userId vào formData
    formData.append("postId", postId);  // Thêm postId vào formData
    formData.append("ownerId", ownerId);  // Thêm ownerId vào formData
    formData.append("fullName", fullName);  // Thêm postId vào formData
    formData.append("email", email); 
    formData.append("phone", phone); 
    formData.append("cv", fs.createReadStream(file.path));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${webhookBaseURL}/get-pdf-candidate`,
        formData,
        config
      );
      console.log("Webhook response:", response.data);
    } catch (error) {
      console.error("Error sending file to webhook:", error);
      return res.status(500).json({ error: "Không thể gửi tệp tới webhook" });
    }

    return res.status(200).json({ message: "Ứng tuyển thành công!" });
  } catch (err) {
    console.error("Error saving applicant:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
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
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
};

export const messageController = {
  sendMessage,
  fetchMessageBetweenTwoPeople,
  deleteMessage,
  sendPDF,
};
