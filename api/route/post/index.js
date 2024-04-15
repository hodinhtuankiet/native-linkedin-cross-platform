import express from "express";
import { postRoute } from "./postRoute";
import { interactRoute } from "./interactRoute";
const Router = express.Router();

// Register API
Router.use("/create", postRoute);

Router.use("/all", postRoute);

Router.use("/like", interactRoute);

Router.use("/profile", interactRoute);

export const POST_APIs = Router;
