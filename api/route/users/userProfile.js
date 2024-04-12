import express from "express";

const Router = express.Router();
import { userController } from "../../controllers/userController";
Router.route("/:userId").get(userController.findIdByProfile);
export const userProfile = Router;
