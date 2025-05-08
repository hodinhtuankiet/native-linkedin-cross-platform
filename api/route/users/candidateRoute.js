import express from "express";

const Router = express.Router();
import { userController } from "../../controllers/userController.js";
Router.route("/:postId").get(userController.findCandidateByIdPost);
export const candidateRoute = Router;
