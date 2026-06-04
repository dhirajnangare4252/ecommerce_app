import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, saveToken } from "../src/utils/auth";

export default function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${BASE}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        saveToken(data);
        setMsg("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        setMsg(data.detail || data.error || "Login failed");
      }
    } catch (error) {
      setMsg("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        {msg && <p className={`mt-4 ${msg.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{msg}</p>}
        <div className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
