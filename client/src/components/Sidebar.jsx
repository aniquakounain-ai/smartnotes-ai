import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <h2>📚 SmartNotes AI</h2>

      <nav>

        <Link to="/dashboard">
          🏠 Dashboard
        </Link>

        <Link to="/ai-notes">
          📝 AI Notes
        </Link>

        <Link to="/my-notes">
          📚 My Notes
        </Link>

        <Link to="/pdf-summary">
          📄 PDF Summary
        </Link>

        <Link to="/flashcards">
          🧠 Flashcards
        </Link>

        <Link to="/quiz">
          ❓ Quiz Generator
        </Link>

        <Link to="/settings">
          ⚙️ Settings
        </Link>

      </nav>

    </aside>
  );
}