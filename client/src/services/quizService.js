export async function generateQuiz(
  board,
  studentClass,
  subject,
  chapter
) {
  try {
    const response = await fetch(
      "https://smartnotes-ai-del3.onrender.com/api/ai/generate-quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
          studentClass,
          subject,
          chapter,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to generate quiz."
      );
    }

    return data.quiz;
  } catch (error) {
    throw new Error(
      error.message || "Backend connection failed."
    );
  }
}