import { useState } from "react";
import "../styles/dashboard.css";
import { generateNotes } from "../services/aiService";

export default function AINotes() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Bullet Points");
  const [length, setLength] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const result = await generateNotes(topic, style, length);

      setNotes(result);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-content">
      <h1>📝 AI Notes Generator</h1>

      <p className="dashboard-subtitle">
        Generate structured notes using AI.
      </p>

      <input
        type="text"
        placeholder="Enter Topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="note-input"
      />

      <br />
      <br />

      <label>Style</label>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="note-select"
      >
        <option>Bullet Points</option>
        <option>Paragraph</option>
        <option>Exam Notes</option>
      </select>

      <br />
      <br />

      <label>Length</label>

      <select
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="note-select"
      >
        <option>Short</option>
        <option>Medium</option>
        <option>Detailed</option>
      </select>

      <br />
      <br />

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "✨ Generate Notes"}
      </button>

      {notes && (
        <div className="notes-box">
          <pre>{notes}</pre>
        </div>
      )}
    </div>
  );
}