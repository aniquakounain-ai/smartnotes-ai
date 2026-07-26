export async function generateNotes(
  board,
  studentClass,
  subject,
  chapter,
  style,
  length
) {
  const response = await fetch(
    "https://smartnotes-ai-del3.onrender.com/api/ai/generate-notes",
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
        style,
        length,
      }),
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.notes;
}

export async function generateFlashcards(
  board,
  studentClass,
  subject,
  chapter
) {
  const response = await fetch(
    "https://smartnotes-ai-del3.onrender.com/api/ai/generate-flashcards",
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

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.cards;
}

export async function getNotes() {
  const response = await fetch(
"https://smartnotes-ai-del3.onrender.com/api/ai/notes"  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.notes;
}

export async function deleteNote(id) {
  const response = await fetch(
`https://smartnotes-ai-del3.onrender.com/api/ai/notes/${id}`,    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}