import express from "express";
import { postRoute } from "./postRoute.js";
import { interactRoute } from "./interactRoute.js";
import { handlePostRoute } from "./handlePostRoute.js";
import { searchPostRoute } from "./searchPostRoute.js";
const Router = express.Router();

Router.use("/create", postRoute);

Router.use("/all", postRoute);

Router.use("/createComment", postRoute);

Router.use("/allComment", handlePostRoute);

Router.use("/like", interactRoute);

Router.use("/profile", interactRoute);

Router.use("/deletePost", handlePostRoute);

Router.use("/search", searchPostRoute);

export const POST_APIs = Router;
