import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <h1>👋 Welcome Back!</h1>

        <p className="dashboard-subtitle">
          Choose what you want to study today.
        </p>

        <div className="dashboard-grid">

          <DashboardCard
            icon="📝"
            title="AI Notes"
            description="Generate smart notes from any topic."
          />

          <DashboardCard
            icon="📄"
            title="PDF Summary"
            description="Upload PDFs and get instant summaries."
          />

          <DashboardCard
            icon="🧠"
            title="Flashcards"
            description="Create flashcards automatically."
          />

          <DashboardCard
            icon="❓"
            title="Quiz Generator"
            description="Generate quizzes for practice."
          />

        </div>
      </main>
    </div>
  );
}