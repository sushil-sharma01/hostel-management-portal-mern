import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password Updated Successfully ✅");

      setCurrentPassword("");
      setNewPassword("");

      const role = localStorage.getItem("role");

      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/student");
      }

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Error updating password ❌"
      );
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">

        <h2>Change Password</h2>

        <form onSubmit={handleSubmit} className="payment-form">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
}