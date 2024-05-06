import express from "express";
import { messageRoute } from "./message";
import { deleteMessageRoute } from "./deleteMessage";
import { searchMessageRoute } from "./searchMessageRoute";
const Router = express.Router();

Router.use("/messages", messageRoute);

Router.use("/deleteMessage", deleteMessageRoute);

Router.use("/searchMessage", searchMessageRoute);

export const MESSAGE_APIs = Router;
