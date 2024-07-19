import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const ActiveSchema = new Schema({
  name: { type: String, required: true },
  socketID: { type: String, required: true },
  uid: { type: String, default: uuidv4 },
  email: { type: String, required: true },
});

const Active = mongoose.model("active_chat", ActiveSchema);

export default Active;
