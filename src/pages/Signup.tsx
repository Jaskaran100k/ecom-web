import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup(email, password);
    if (success) {
      navigate("/products");
    } else {
      alert("Email already exists");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "0 auto",
        minHeight: "calc(100vh - 170px)",
        background: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#1a1a1a",
        }}
      >
        Sign Up
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
              color: "#666",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.9rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              marginBottom: "0.5rem",
              color: "#666",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.9rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100",
            padding: "0.75rem",
            fontSize: "1rem",
            background: "#ff6f61",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
      <p
        style={{
          fontSize: "0.9rem",
          textAlign: "center",
          marginTop: "1rem",
          color: "#666",
        }}
      >
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#ff6f61", textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
};
