import mongoose from "mongoose";
import { env } from "./environment";
mongoose
  .connect(env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

export default mongoose;
