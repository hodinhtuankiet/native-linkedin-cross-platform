import express from "express";
import { userRoute } from "./userRoute.js";
import { userProfile } from "./userProfile.js";
const Router = express.Router();

// Register API
Router.use("/users", userRoute);

Router.use("/profile", userProfile);

export const USER_APIs = Router;
