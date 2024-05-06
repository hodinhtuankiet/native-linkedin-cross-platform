import express from "express";
import multer from "multer";
import { searchController } from "../../controllers/searchController";
const Router = express.Router();

Router.route("/").get(searchController.searchPost);

export const searchMessageRoute = Router;
