import express from "express";
import { registerRoute } from "./registerRoute.js";
import { loginControllerr } from "./loginRoute.js";

const Router = express.Router();

// Register API
Router.use("/", registerRoute);

Router.use("/", loginControllerr);
export const Authenticate_APIs = Router;
