import Note from "../models/Note.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function generateNotes(req, res) {
  try {
    const { board, studentClass, subject, chapter, style, length } = req.body;

    const prompt = `
You are an expert ${board} teacher with years of experience preparing students for board examinations.

Generate HIGH-QUALITY study notes.

Board: ${board}
Class: ${studentClass}
Subject: ${subject}
Chapter: ${chapter}

Style: ${style}
Length: ${length}

The notes MUST follow this structure:

# ${chapter}

## 📖 Chapter Overview
Explain the chapter in simple language suitable for Class ${studentClass} students.

## 🎯 Learning Objectives
List what students should understand after studying this chapter.

## 📚 Important Definitions
Provide important definitions in bullet points.

## ⭐ Key Concepts
Explain every major concept clearly using headings and bullet points.

## 📝 Important Board Exam Points
Mention facts and concepts frequently asked in board examinations.

## ⚠ Common Mistakes
Mention common mistakes students make while answering board questions.

## 📌 Quick Revision Summary
Summarize the chapter in 8–10 important bullet points.

Formatting Rules:
- Use Markdown headings.
- Use bullet points wherever possible.
- Keep the language simple.
- Make it exam-oriented.
- Do NOT include unnecessary information.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    );

    const notes = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!notes) {
      return res.status(500).json({
        success: false,
        message: "No notes were generated.",
      });
    }

    // Save notes to MongoDB
    const savedNote = await Note.create({
      topic: chapter,
      notes,
      style,
      length,
    });

    res.json({
      success: true,
      notes,
      savedNote,
    });
  } catch (error) {
    console.error("Gemini Error:");
    console.error(error.response?.data || error.message);

    const status = error.response?.status;

    if (status === 503) {
      return res.status(503).json({
        success: false,
        message: "Gemini is busy. Please try again in a minute.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to generate notes.",
    });
  }
}
export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch notes.",
    });
  }
}