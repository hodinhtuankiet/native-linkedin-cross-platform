import express from "express";
import { connectionRoute } from "./connection.js";
import { connectionRequestRoute } from "./connectionRequest.js";
const Router = express.Router();

// Register API
Router.use("/connection-request", connectionRequestRoute);

Router.use("/connections", connectionRoute);

export const CONNECTION_APIs = Router;
