import express from "express";

const Router = express.Router();
import { connectionController } from "../../controllers/connectionController.js";
Router.route("/:userId").get(connectionController.showAllConnectionsAccepted);
export const connectionRoute = Router;
