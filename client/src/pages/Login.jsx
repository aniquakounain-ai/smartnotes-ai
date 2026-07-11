import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout title="Welcome Back">
      <form className="auth-form">
        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}