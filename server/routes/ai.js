import express from "express";

import { generateNotes } from "../controllers/aiController.js";
import { generateFlashcards } from "../controllers/flashcardController.js";
import { generateQuiz } from "../controllers/quizController.js";
import { getNotes, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/generate-notes", generateNotes);

router.get("/notes", getNotes);

router.delete("/notes/:id", deleteNote);

router.post("/generate-flashcards", generateFlashcards);

router.post("/generate-quiz", generateQuiz);

export default router;