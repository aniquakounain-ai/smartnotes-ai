export async function generateFlashcards(
  board,
  studentClass,
  subject,
  chapter
) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/ai/generate-flashcards",
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
        data.message || "Unable to generate flashcards."
      );
    }

    return data.flashcards;
  } catch (error) {
    throw new Error(
      error.message || "Backend connection failed."
    );
  }
}