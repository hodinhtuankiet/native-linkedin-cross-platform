import express from "express";

const Router = express.Router();
import { connectionController } from "../../controllers/connectionController";
Router.route("/:userId").get(connectionController.showAllConnectionsAccepted);
export const connectionRoute = Router;
