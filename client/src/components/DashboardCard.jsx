export default function DashboardCard({ icon, title, description }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button>Open</button>
    </div>
  );
}