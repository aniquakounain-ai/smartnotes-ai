import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p>Start studying smarter with SmartNotes AI.</p>

        <form>
          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>Create Account</button>
        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}