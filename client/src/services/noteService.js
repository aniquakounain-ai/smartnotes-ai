export async function saveNote(noteData) {

  const response = await fetch(
    "https://smartnotes-ai-del3.onrender.com/api/notes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}