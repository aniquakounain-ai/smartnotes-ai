import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function generateQuiz(req, res) {
  try {
    const {
      board,
      studentClass,
      subject,
      chapter,
    } = req.body;

    const prompt = `
You are an expert ${board} teacher.

Generate exactly 10 board-level multiple-choice questions.

Board: ${board}
Class: ${studentClass}
Subject: ${subject}
Chapter: ${chapter}

Return ONLY valid JSON.

Format:

[
  {
    "question":"Question here",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer":"Correct Option",
    "explanation":"Short explanation"
  }
]

Rules:
- Exactly 10 questions.
- Four options only.
- One correct answer.
- Keep explanations short.
- Return ONLY JSON.
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
      }
    );

    let quiz =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!quiz) {
      return res.status(500).json({
        success: false,
        message: "No quiz generated.",
      });
    }

    // Remove markdown code fences if Gemini returns them
    quiz = quiz
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    quiz = JSON.parse(quiz);

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {
    console.error("Quiz Error:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to generate quiz.",
    });
  }
}
