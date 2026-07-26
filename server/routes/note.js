import express from "express";

import {
  saveNote,
  getNotes,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

// Save a new note
router.post("/", saveNote);

// Get all notes
router.get("/", getNotes);

// Delete a note
router.delete("/:id", deleteNote);

export default router;