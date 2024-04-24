import express from "express";
import { messageRoute } from "./message";
const Router = express.Router();

Router.use("/messages", messageRoute);

// Router.use("/messages", messageRoute);

export const MESSAGE_APIs = Router;
