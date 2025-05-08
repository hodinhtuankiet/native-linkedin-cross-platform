import express from "express";
import { userRoute } from "./userRoute.js";
import { candidateRoute } from "./candidateRoute.js";
import { userProfile } from "./userProfile.js";
const Router = express.Router();

// Register API
Router.use("/users", userRoute);

Router.use("/candidates", candidateRoute);

Router.use("/profile", userProfile);

export const USER_APIs = Router;
