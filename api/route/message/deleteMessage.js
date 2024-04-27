import express from "express";
import multer from "multer";
import { messageController } from "../../controllers/messageController";

const Router = express.Router();

Router.route("/").post(messageController.deleteMessage);

export const deleteMessageRoute = Router;
