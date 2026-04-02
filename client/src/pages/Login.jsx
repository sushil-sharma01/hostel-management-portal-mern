import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      localStorage.clear();

      const res = await axios.post(
  "http://localhost:5000/api/auth/login",
  {
    email,
    password,
    role
  }
);

      // check selected role
      if (res.data.role !== role) {
        setErrorMsg("Wrong role selected ❌");
        setLoading(false);
        return;
      }

      // store user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("roll", res.data.roll);   // ⭐ IMPORTANT FIX

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/student");
      }

    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid Credentials ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f3efe8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "30px",
          backgroundColor: "#f7f1e3",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#3d2f1c" }}>
          Hostel <br /> Management <br /> Login
        </h2>

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <button
            type="button"
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: role === "admin" ? "#c8a97e" : "#ddd",
              border: "none",
              borderRadius: "6px 0 0 6px",
              color: role === "admin" ? "white" : "black",
              cursor: "pointer"
            }}
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => setRole("student")}
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: role === "student" ? "#c8a97e" : "#ddd",
              border: "none",
              borderRadius: "0 6px 6px 0",
              color: role === "student" ? "white" : "black",
              cursor: "pointer"
            }}
          >
            Student
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {errorMsg && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#999" : "#c8a97e",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}