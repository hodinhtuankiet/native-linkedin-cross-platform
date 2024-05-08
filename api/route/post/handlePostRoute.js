import express from "express";

const Router = express.Router();
import { interactController } from "../../controllers/interactController";
// Router.route("/:userId").post(interactController.deletePost);
Router.route("/:postId").delete(interactController.deletePost);

export const handlePostRoute = Router;
