import express from "express";
import { postRoute } from "./postRoute";
const Router = express.Router();

// Register API
Router.use("/create", postRoute);

export const POST_APIs = Router;
