import express from "express";

const Router = express.Router();
import { postController } from "../../controllers/postController.js";
Router.route("/").post(postController.createNewPost);
Router.route("/:postId/:userId").post(postController.createNewCommentPost);
Router.route("/").get(postController.showAllPosts);
Router.route("/:postId/:commentId/:userId").post(
  postController.replyCommentPost
);
export const postRoute = Router;
