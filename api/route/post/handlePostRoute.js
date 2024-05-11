import express from "express";

const Router = express.Router();
import { interactController } from "../../controllers/interactController.js";
import { postController } from "../../controllers/postController.js";
// Router.route("/:userId").post(interactController.deletePost);
Router.route("/:postId/:userId").delete(interactController.deletePost);
Router.route("/:postId").get(postController.showAllComments);

export const handlePostRoute = Router;
