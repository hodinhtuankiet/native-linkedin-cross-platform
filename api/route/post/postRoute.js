import express from "express";

const Router = express.Router();
import { postController } from "../../controllers/postController";
Router.route("/").post(postController.createNewPost);
export const postRoute = Router;
