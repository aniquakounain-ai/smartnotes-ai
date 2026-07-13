import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function generateNotes(req, res) {
  try {
    const { topic, style, length } = req.body;

    const prompt = `
You are an expert teacher.

Create structured study notes.

Topic: ${topic}
Style: ${style}
Length: ${length}

Include:
- Title
- Introduction
- Important Concepts
- Key Points
- Summary

Use headings and bullet points.
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

    const notes = response.data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Gemini Error:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Unable to generate notes.",
    });
  }
}