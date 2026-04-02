import React, { useState } from "react";
import axios from "axios";

export default function StudentComplaints() {
  const [studentName, setStudentName] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName || !complaint) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/complaints", {
        studentName,
        complaint,
      });

      alert("Complaint submitted successfully ✅");
      setStudentName("");
      setComplaint("");
    } catch (error) {
      alert("Error submitting complaint ❌");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // ✅ vertical center
        backgroundColor: "#f3efe8",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "#f7f1e3",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#3d2f1c",
          }}
        >
          📩 Complaint Box
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <textarea
            placeholder="Enter complaint..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "200px",
              padding: "10px",
              backgroundColor: "#c8a97e",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
