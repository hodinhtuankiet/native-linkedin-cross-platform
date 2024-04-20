import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import crypto from "crypto";
import { Authenticate_APIs } from "./route/authenticate/index.js";
import { USER_APIs } from "./route/users/index.js";
import { CONNECTION_APIs } from "./route/connection/index.js";
import { POST_APIs } from "./route/post/index.js";
import { MESSAGE_APIs } from "./route/message/index.js";
import nodemailer from "nodemailer";
import mongodb from "./config/mongodb";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
import cors from "cors";
import "dotenv/config";
import passport from "./node_modules/passports";
import { Strategy as LocalStrategy } from "passport-local";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", Authenticate_APIs);

app.use("/", USER_APIs);

app.use("/", CONNECTION_APIs);

app.use("/", POST_APIs);

app.use("/", MESSAGE_APIs);
app.listen(port, () => {
  console.log(`server is running on port ${process.env.NAME_TUI}`);
});
