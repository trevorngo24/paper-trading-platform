import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8000";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(API_BASE + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.detail || "Login failed");
      return;
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", username);
    navigate("/dashboard");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(API_BASE + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.detail || "Registration failed");
      return;
    }

    // auto-login after register
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const loginRes = await fetch(API_BASE + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });

    const loginData = await loginRes.json();
    localStorage.setItem("token", loginData.access_token);
    localStorage.setItem("username", username);
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {mode === "register" && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </div>
  );
}