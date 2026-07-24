import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema(
  {
    board: {
      type: String,
      required: true,
    },

    studentClass: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    chapter: {
      type: String,
      required: true,
    },

    cards: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Flashcard", flashcardSchema);