import express from "express";
import { generateNotes } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-notes", generateNotes);

export default router;