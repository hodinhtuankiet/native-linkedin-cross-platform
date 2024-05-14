import express from "express";

const Router = express.Router();
import { searchController } from "../../controllers/searchController.js";
// Router.route("/:userId").post(interactController.deletePost);
Router.route("/").get(searchController.searchPost);

export const searchPostRoute = Router;
