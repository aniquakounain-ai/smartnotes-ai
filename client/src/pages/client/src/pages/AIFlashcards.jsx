import { useState } from "react";
import "../styles/dashboard.css";
import syllabus from "../data/syllabus";
import { generateFlashcards } from "../services/flashcardService";

export default function AIFlashcards() {
  const [board, setBoard] = useState("CBSE");
  const [studentClass, setStudentClass] = useState("10");
  const [subject, setSubject] = useState("Science");
  const [chapter, setChapter] = useState("");

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCard, setOpenCard] = useState(null);

  const chapters =
    syllabus?.[board]?.[studentClass]?.[subject] || [];

  async function handleGenerate() {
  if (!chapter) {
    alert("Please select a chapter.");
    return;
  }

  setLoading(true);

  try {
    const result = await generateFlashcards(
      board,
      studentClass,
      subject,
      chapter
    );

    setCards(result);

  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="dashboard-content">
      <h1>🧠 AI Flashcards</h1>

      <p className="dashboard-subtitle">
        Generate AI-powered flashcards for quick revision.
      </p>

      <label>Board</label>

      <select
        value={board}
        onChange={(e) => setBoard(e.target.value)}
        className="note-select"
      >
        <option>CBSE</option>
        <option>ICSE</option>
        <option>State Board</option>
        <option>JEE</option>
        <option>NEET</option>
        <option>Engineering</option>
      </select>

      <br /><br />

      <label>Class</label>

      <select
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        className="note-select"
      >
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>

      <br /><br />

      <label>Subject</label>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="note-select"
      >
        <option>Science</option>
        <option>Mathematics</option>
        <option>Social Science</option>
        <option>English</option>
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
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <br /><br />

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        {loading ? "Generating..." : "🧠 Generate Flashcards"}
      </button>

      <div className="flashcards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flashcard"
          >
            <h3>{card.question}</h3>

            {openCard === index ? (
              <>
                <p>{card.answer}</p>

                <button
                  className="study-btn"
                  onClick={() => setOpenCard(null)}
                >
                  Hide Answer
                </button>
              </>
            ) : (
              <button
                className="study-btn"
                onClick={() => setOpenCard(index)}
              >
                Show Answer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}