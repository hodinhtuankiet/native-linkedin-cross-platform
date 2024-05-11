import express from "express";

const Router = express.Router();
import { userController } from "../../controllers/userController.js";
Router.route("/profile/:userId").get(userController.findIdByProfile);
Router.route("/:userId").get(userController.findIdByUserId);
export const userRoute = Router;
