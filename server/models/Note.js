import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      required: true,
    },

    style: {
      type: String,
      default: "Board Exam Notes",
    },

    length: {
      type: String,
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);