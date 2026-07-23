import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import syllabus from "../data/syllabus";
import "../styles/dashboard.css";
import { generateFlashcards } from "../services/aiService";

export default function Flashcards() {
  const [board, setBoard] = useState("CBSE");
  const [studentClass, setStudentClass] = useState("10");
  const [subject, setSubject] = useState("Science");
  const [chapter, setChapter] = useState("");

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);


  const classes = Object.keys(syllabus?.[board] || {});
  const subjects = Object.keys(
    syllabus?.[board]?.[studentClass] || {}
  );

  const chapters =
    syllabus?.[board]?.[studentClass]?.[subject] || [];

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

  useEffect(() => {
    function handleKeyDown(e) {
      if (cards.length === 0) return;

      switch (e.key) {
        case "ArrowRight":
          nextCard();
          break;

        case "ArrowLeft":
          previousCard();
          break;

        case " ":
          e.preventDefault();
          setIsFlipped((prev) => !prev);
          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cards, currentCard]);

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
      setCurrentCard(0);
      setIsFlipped(false);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function nextCard() {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  }

  function previousCard() {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  }

  const progress =
    cards.length > 0
      ? ((currentCard + 1) / cards.length) * 100
      : 0;

  const current = cards[currentCard];

  function shuffleCards() {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    setCards(shuffled);

    setCurrentCard(0);

    setIsFlipped(false);
  }
  function restartStudy() {
    setCurrentCard(0);

    setIsFlipped(false);
  }
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <h1>🧠 AI Flashcards</h1>

        <p className="dashboard-subtitle">
          Generate AI-powered flashcards for quick revision.
        </p>

        <label>Board</label>

        <select
          className="note-select"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        >
          {Object.keys(syllabus).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Class</label>

        <select
          className="note-select"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        >
          {classes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Subject</label>

        <select
          className="note-select"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {subjects.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Chapter</label>

        <select
          className="note-select"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        >
          <option value="">Select Chapter</option>

          {chapters.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button
          className="copy-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "Generating Flashcards..."
            : "🧠 Generate Flashcards"}
        </button>

        <br />
        <br />

        {cards.length > 0 && (
          <>
            <h2 style={{ textAlign: "center" }}>
              Flashcard {currentCard + 1} of {cards.length}
            </h2>

            <div className="progress-container">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div
              className={`study-card ${isFlipped ? "flipped" : ""}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="study-card-inner">

                {/* Front Side */}
                <div className="study-card-front">
                  <h2>❓ Question</h2>

                  <p>{current?.question}</p>

                  <small>
                    Click anywhere to reveal the answer
                  </small>
                </div>

                {/* Back Side */}
                <div className="study-card-back">
                  <h2>✅ Answer</h2>

                  <p>{current?.answer}</p>

                  <small>
                    Click anywhere to flip back
                  </small>
                </div>

              </div>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#666",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              ⌨️ <strong>Keyboard Shortcuts:</strong> Space = Flip &nbsp; | &nbsp;
              ← Previous &nbsp; | &nbsp; → Next
            </p>

            <div className="study-navigation">

              <button
                className="study-btn"
                onClick={previousCard}
                disabled={currentCard === 0}
              >
                ⬅ Previous
              </button>

              <button
                className="study-btn"
                onClick={restartStudy}
              >
                🔄 Restart
              </button>

              <button
                className="study-btn"
                onClick={shuffleCards}
              >
                🔀 Shuffle
              </button>

              <button
                className="study-btn"
                onClick={nextCard}
                disabled={currentCard === cards.length - 1}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}