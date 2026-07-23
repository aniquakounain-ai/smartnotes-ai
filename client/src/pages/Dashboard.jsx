import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <h1>👋 Welcome Back!</h1>

        <p className="dashboard-subtitle">
          Your AI-powered study companion. Choose a tool to start learning.
        </p>

        <div className="dashboard-grid">

          <DashboardCard
            icon="📝"
            title="AI Notes"
            description="Generate board-specific notes instantly."
            link="/ai-notes"
          />

          <DashboardCard
            icon="📚"
            title="My Notes"
            description="View all your saved AI notes."
            link="/my-notes"
          />

          <DashboardCard
            icon="🧠"
            title="AI Flashcards"
            description="Revise chapters using smart flashcards."
            link="/"
          />

          <DashboardCard
            icon="❓"
            title="AI Quiz"
            description="Practice with AI-generated MCQs."
            link="/quiz"
          />

          <DashboardCard
            icon="📄"
            title="PDF Summary"
            description="Upload PDFs and get instant summaries."
            link="/pdf-summary"
          />

          <DashboardCard
            icon="⭐"
            title="Saved Notes"
            description="Access your saved study notes."
            link="/saved-notes"
          />

          <DashboardCard
            icon="⚙️"
            title="Settings"
            description="Customize SmartNotes AI."
            link="/settings"
          />

        </div>
      </main>
    </div>
  );
}