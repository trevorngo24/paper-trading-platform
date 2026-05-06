import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelSky from "./PixelSky";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_BASE = "http://localhost:8000";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    try {
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
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
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

      setSuccess("Account created! Logging you in...");

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
    } catch {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-sm mx-auto px-4 pt-40 pb-20">

        <p className="font-display text-[#81a6c6] tracking-widest mb-2 text-center" style={{ fontSize: "9px" }}>
          ◆ {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"} ◆
        </p>
        <h1 className="font-display text-2xl text-[#f3e3d0] mb-8 text-center">
          {mode === "login" ? "LOGIN" : "REGISTER"}
        </h1>

        <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="font-display text-[#81a6c6] tracking-widest" style={{ fontSize: "8px" }}>
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ fontSize: "12px" }}
              className="bg-transparent border border-[#81a6c6] text-[#f3e3d0] font-display tracking-widest px-4 py-2 outline-none focus:border-[#f3e3d0] transition-colors"
            />
          </div>

          {mode === "register" && (
            <div className="flex flex-col gap-1">
              <label className="font-display text-[#81a6c6] tracking-widest" style={{ fontSize: "8px" }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontSize: "12px" }}
                className="bg-transparent border border-[#81a6c6] text-[#f3e3d0] font-display tracking-widest px-4 py-2 outline-none focus:border-[#f3e3d0] transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-display text-[#81a6c6] tracking-widest" style={{ fontSize: "8px" }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontSize: "12px" }}
              className="bg-transparent border border-[#81a6c6] text-[#f3e3d0] font-display tracking-widest px-4 py-2 outline-none focus:border-[#f3e3d0] transition-colors"
            />
          </div>

          {error && (
            <p className="font-body text-red-400 text-xs text-center">{error}</p>
          )}
          {success && (
            <p className="font-body text-green-400 text-xs text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ fontSize: "10px" }}
            className="border border-[#81a6c6] text-[#81a6c6] font-display tracking-widest py-3 hover:bg-[#81a6c6] hover:text-[#0a0a0a] transition-colors disabled:opacity-40 mt-2"
          >
            {loading ? "..." : mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="border-t border-[#81a6c6] mt-8 pt-6 text-center" style={{ borderColor: "rgba(129,166,198,0.2)" }}>
          <p className="font-body text-[#d2c4b4] text-xs mb-3">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setSuccess(""); }}
            style={{ fontSize: "9px" }}
            className="font-display text-[#81a6c6] tracking-widest hover:text-[#f3e3d0] transition-colors"
          >
            {mode === "login" ? "CREATE ACCOUNT →" : "← SIGN IN"}
          </button>
        </div>

      </main>
      <Footer />
    </div>
  );
}