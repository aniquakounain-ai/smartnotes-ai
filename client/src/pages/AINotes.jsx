import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import syllabus from "../data/syllabus";
import "../styles/dashboard.css";
import { generateNotes } from "../services/aiService";

export default function AINotes() {
  const [board, setBoard] = useState("CBSE");
  const [studentClass, setStudentClass] = useState("10");
  const [subject, setSubject] = useState("Science");
  const [chapter, setChapter] = useState("");

  const [style, setStyle] = useState("Board Exam Notes");
  const [length, setLength] = useState("Medium");

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic Data
  const classes = Object.keys(syllabus?.[board] || {});
  const subjects = Object.keys(
    syllabus?.[board]?.[studentClass] || {}
  );
  const chapters =
    syllabus?.[board]?.[studentClass]?.[subject] || [];

  // Reset dependent selections
  useEffect(() => {
    if (!classes.includes(studentClass) && classes.length > 0) {
      setStudentClass(classes[0]);
    }
  }, [board]);

  useEffect(() => {
    if (!subjects.includes(subject) && subjects.length > 0) {
      setSubject(subjects[0]);
    }
  }, [board, studentClass]);

  useEffect(() => {
    setChapter("");
  }, [board, studentClass, subject]);

  async function handleGenerate() {
    if (!chapter) {
      alert("Please select a chapter.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateNotes(
        board,
        studentClass,
        subject,
        chapter,
        style,
        length
      );

      setNotes(result);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function copyNotes() {
    navigator.clipboard.writeText(notes);
    alert("Notes copied to clipboard!");
  }
  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SmartNotes AI", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Board: ${board}`, 20, 35);
    doc.text(`Class: ${studentClass}`, 20, 43);
    doc.text(`Subject: ${subject}`, 20, 51);
    doc.text(`Chapter: ${chapter}`, 20, 59);

    const splitNotes = doc.splitTextToSize(notes, 170);

    doc.text(splitNotes, 20, 75);

    doc.save(
      `${board}_Class${studentClass}_${chapter.replace(/\s+/g, "_")}.pdf`
    );
  }

  return (
    <div className="dashboard-content">
      <h1>📝 SmartNotes AI</h1>

      <p className="dashboard-subtitle">
        Generate board-specific study notes using AI.
      </p>

      <label>Board</label>

      <select
        value={board}
        onChange={(e) => setBoard(e.target.value)}
        className="note-select"
      >
        {Object.keys(syllabus).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Class</label>

      <select
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        className="note-select"
      >
        {classes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Subject</label>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="note-select"
      >
        {subjects.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Chapter</label>

      <select
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        className="note-select"
      >
        <option value="">Select Chapter</option>

        {chapters.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br /><br />

      <label>Style</label>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="note-select"
      >
        <option>Board Exam Notes</option>
        <option>Bullet Points</option>
        <option>Paragraph</option>
      </select>

      <br /><br />

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

      <br /><br />

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "✨ Generate Notes"}
      </button>

      <br />
      <br />

      {notes && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="copy-btn"
            onClick={copyNotes}
          >
            📋 Copy Notes
          </button>

          <button
            className="copy-btn"
            onClick={downloadPDF}
          >
            📄 Download PDF
          </button>
        </div>
      )}
  
      {notes && (
        <>
          <h2 className="notes-title">
            📖 Generated Notes
          </h2>

          <div className="notes-box">
            <ReactMarkdown>{notes}</ReactMarkdown>
          </div>

          <div className="study-toolbar">

            <button
              className="study-btn"
              onClick={copyNotes}
            >
              📋 Copy
            </button>

            <button
              className="study-btn"
              onClick={downloadPDF}
            >
              📄 PDF
            </button>

            <button
              className="study-btn"
              onClick={() => alert("Flashcards coming soon!")}
            >
              🧠 Flashcards
            </button>

            <button
              className="study-btn"
              onClick={() => alert("Quiz Generator coming soon!")}
            >
              ❓ Quiz
            </button>

            <button
              className="study-btn"
              onClick={() => alert("Save Notes coming soon!")}
            >
              ⭐ Save
            </button>

            <button
              className="study-btn"
              onClick={() => alert("Listen feature coming soon!")}
            >
              🔊 Listen
            </button>

          </div>
        </>
      )}
    </div>
  );
}