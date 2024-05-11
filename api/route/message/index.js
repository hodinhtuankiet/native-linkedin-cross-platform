import express from "express";
import { messageRoute } from "./message.js";
import { deleteMessageRoute } from "./deleteMessage.js";
import { searchMessageRoute } from "./searchMessageRoute.js";
const Router = express.Router();

Router.use("/messages", messageRoute);

Router.use("/deleteMessage", deleteMessageRoute);

Router.use("/searchMessage", searchMessageRoute);

export const MESSAGE_APIs = Router;
