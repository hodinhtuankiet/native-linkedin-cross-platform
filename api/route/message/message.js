import express from "express";
import multer from "multer";
import { messageController } from "../../controllers/messageController";

const Router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
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
