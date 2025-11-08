import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    problemSteps: [{ type: String, required: true, trim: true }],
    fixSteps: [{ type: String, required: true, trim: true }],
    imageUrl: { type: String },
    code: { type: String },
    status: {
      type: String,
      enum: ["In Progress", "Complete"],
      default: "In Progress",
      required: true,
    },
    type: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Todo", todoSchema);
