import express from "express";

const Router = express.Router();
import { interactController } from "../../controllers/interactController";
Router.route("/:userId").post(interactController.deletePost);
export const handlePostRoute = Router;
