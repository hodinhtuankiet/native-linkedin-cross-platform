import express from "express";
import { messageRoute } from "./message";
import { deleteMessageRoute } from "./deleteMessage";
const Router = express.Router();

Router.use("/messages", messageRoute);

Router.use("/deleteMessage", deleteMessageRoute);

export const MESSAGE_APIs = Router;
