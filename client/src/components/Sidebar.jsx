import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>SmartNotes</h2>

      <nav>
        <Link to="/dashboard">🏠 Dashboard</Link>

        <Link to="#">📝 New Note</Link>

        <Link to="#">📄 My Notes</Link>

        <Link to="#">📚 Flashcards</Link>

        <Link to="#">❓ Quizzes</Link>

        <Link to="#">⚙ Settings</Link>
      </nav>
    </aside>
  );
}