import express from "express";
import { postRoute } from "./postRoute";
import { interactRoute } from "./interactRoute";
import { handlePostRoute } from "./handlePostRoute";
const Router = express.Router();

// Register API
Router.use("/create", postRoute);

Router.use("/all", postRoute);

Router.use("/like", interactRoute);

Router.use("/profile", interactRoute);

Router.use("/deletePost", handlePostRoute);

export const POST_APIs = Router;
