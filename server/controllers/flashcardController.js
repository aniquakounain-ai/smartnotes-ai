import axios from "axios";
import dotenv from "dotenv";
import Flashcard from "../models/Flashcard.js";

dotenv.config();

export async function generateFlashcards(req, res) {
  try {
    const {
      board,
      studentClass,
      subject,
      chapter,
    } = req.body;

    const prompt = `
You are an expert ${board} teacher.

Generate exactly 10 flashcards for:

Board: ${board}
Class: ${studentClass}
Subject: ${subject}
Chapter: ${chapter}

Return ONLY valid JSON.

Format:

[
  {
    "question":"Question here",
    "answer":"Answer here"
  }
]

Do not write markdown.
Do not explain.
Return only JSON.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
      }
    );

    let text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        success: false,
        message: "No flashcards generated.",
      });
    }

    // Remove markdown if Gemini wraps the JSON
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    const cards = JSON.parse(text);

    await Flashcard.create({
      board,
      studentClass,
      subject,
      chapter,
      cards,
    });

    res.json({
      success: true,
      cards,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to generate flashcards.",
    });
  }
}