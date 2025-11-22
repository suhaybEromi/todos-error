import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },

  // social logins
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },

  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model("User", userSchema);
