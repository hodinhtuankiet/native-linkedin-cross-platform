import express from "express";

const Router = express.Router();
import { interactController } from "../../controllers/interactController.js";
Router.route("/:postId/:userId").post(interactController.likePost);
Router.route("/:postId/:userId").put(interactController.updateDescription);
export const interactRoute = Router;
