import express from "express";

const Router = express.Router();
import { interactController } from "../../controllers/interactController";
Router.route("/:postId/:userId").post(interactController.likePost);
export const interactRoute = Router;
