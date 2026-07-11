import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>SmartNotes AI</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}