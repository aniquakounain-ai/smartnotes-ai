import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <h1>Welcome Back 👋</h1>

        <p>
          Select an option from the sidebar to begin studying.
        </p>
      </main>
    </div>
  );
}