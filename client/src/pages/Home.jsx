import "../styles/home.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>Study Smarter with AI</h1>

        <p>
          Generate notes, summaries, flashcards and quizzes instantly using
          Artificial Intelligence.
        </p>

        <div className="buttons">
          <Link to="/signup">
            <button>Get Started</button>
          </Link>

          <Link to="/login">
            <button className="secondary">Login</button>
          </Link>
        </div>
      </section>

      <section className="features">

        <div className="card">
          <div className="icon">📝</div>
          <h2>AI Notes</h2>
          <p>Create well-structured notes from any topic within seconds.</p>
        </div>

        <div className="card">
          <div className="icon">📄</div>
          <h2>Summaries</h2>
          <p>Upload PDFs and receive concise summaries instantly.</p>
        </div>

        <div className="card">
          <div className="icon">🧠</div>
          <h2>Flashcards</h2>
          <p>Automatically generate flashcards for effective revision.</p>
        </div>

        <div className="card">
          <div className="icon">❓</div>
          <h2>Quiz Generator</h2>
          <p>Create quizzes from your notes to test yourself.</p>
        </div>

      </section>

      <section className="cta">
        <h2>Thousands of students are studying smarter.</h2>
        <p>Join SmartNotes AI today.</p>

        <Link to="/signup">
          <button>Start Free</button>
        </Link>
      </section>
    </>
  );
}