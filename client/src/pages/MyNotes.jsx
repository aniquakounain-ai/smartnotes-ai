import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getNotes,
  deleteNote,
} from "../services/aiService";
import "../styles/dashboard.css";

export default function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
  try {
    const data = await getNotes();

    console.log("Received:", data);
    console.log("Type:", typeof data);
    console.log("Length:", data.length);

    setNotes(data);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

    loadNotes();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNote(id);

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );

      alert("✅ Note deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <h1>📚 My Notes</h1>

        <p className="dashboard-subtitle">
          All your AI-generated notes.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes saved yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="flashcard"
              style={{ marginBottom: "20px" }}
            >
              <h3>{note.topic}</h3>

              <p>
                <strong>Style:</strong> {note.style}
              </p>

              <p>
                <strong>Length:</strong> {note.length}
              </p>

              <p>
                {new Date(note.createdAt).toLocaleString()}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  className="study-btn"
                  onClick={() => alert(note.notes)}
                >
                  📖 Open
                </button>

                <button
                  className="study-btn"
                  onClick={() => handleDelete(note._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}