import express from "express";

const Router = express.Router();
import { connectionController } from "../../controllers/connectionController";

Router.route("/").post(connectionController.requestConnection);
Router.route("/:userId").get(connectionController.showAllRequestConnections);
Router.route("/accept").post(
  connectionController.showAllRequestConnectionsAccept
);
export const connectionRequestRoute = Router;
