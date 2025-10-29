import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    problemSteps: { type: String, required: true },
    fixSteps: { type: String, required: true },
    imageUrl: { type: String },
    code: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.model("Todo", todoSchema);
