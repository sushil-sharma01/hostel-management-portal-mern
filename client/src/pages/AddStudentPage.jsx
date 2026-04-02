import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddStudentPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!name || !roll || !email || !roomNumber) {
      alert("All fields are required");
      return;
    }

    const studentData = {
      name: name.trim(),
      roll: Number(roll),
      email: email.trim().toLowerCase(),
      roomNumber: Number(roomNumber),
      totalFees: 50000,
      paidFees: 0
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students",
        studentData
      );

      alert(res.data.message || "Student Added Successfully ✅");

      // Reset form
      setName("");
      setRoll("");
      setEmail("");
      setRoomNumber("");

      navigate("/students");

    } catch (err) {
      console.error("ADD ERROR:", err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Error adding student ❌");
      }
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">

        <button
          onClick={() => navigate("/students")}
          className="back-btn"
        >
          ← Back to Students
        </button>

        <h2>Add Student</h2>

        <form onSubmit={handleAddStudent} className="payment-form">

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />

          <button type="submit">
            Add Student
          </button>

        </form>

      </div>
    </div>
  );
}