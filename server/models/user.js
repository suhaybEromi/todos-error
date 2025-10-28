import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

export default mongoose.model("User", userSchema);
