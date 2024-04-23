import express from "express";
import multer from "multer";
import { messageController } from "../../controllers/messageController";

const Router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Đường dẫn lưu trữ tệp
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

Router.route("/").post(
  upload.single("imageFile"),
  messageController.sendMessage
);

Router.route("/:senderId/:recepientId").get(
  messageController.fetchMessageBetweenTwoPeople
);

export const messageRoute = Router;
