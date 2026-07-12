import { Link } from "react-router-dom";

export default function DashboardCard({
  icon,
  title,
  description,
  link,
}) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <Link to={link}>
        <button>Open</button>
      </Link>
    </div>
  );
}