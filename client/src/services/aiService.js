import api from "./api";

export async function generateNotes(topic, style, length) {
  try {
    const response = await api.post("/ai/generate-notes", {
      topic,
      style,
      length,
    });

    return response.data.notes;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}