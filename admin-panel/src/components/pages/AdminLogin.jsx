import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import { adminLogin } from "../../services/adminLoginService";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminLogin(email, password);

      // ✅ Redirect to home after successful login
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#18181b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "transparent",
          padding: 0,
          borderRadius: 0,
          boxShadow: "none",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          margin: "0 auto",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "1rem" }}>
          Admin Login
        </h2>
        {error && (
          <div style={{ color: "#ef4444", textAlign: "center" }}>{error}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="email" style={{ color: "#cbd5e1" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #3f3f46",
              background: "#18181b",
              color: "#fff",
              fontSize: "1rem",
              width: "100%",
            }}
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="password" style={{ color: "#cbd5e1" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #3f3f46",
              background: "#18181b",
              color: "#fff",
              fontSize: "1rem",
              width: "100%",
            }}
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "none",
            background: "#6366f1",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s",
            width: "100%",
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
