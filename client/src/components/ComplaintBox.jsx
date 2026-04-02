import React, { useState } from "react";
import axios from "axios";
import "../styles/complaint.css";

export default function ComplaintBox() {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!name || !complaint) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/complaints", {
        student: name,
        complaint: complaint,
      });

      alert("Complaint submitted successfully ✅");

      setName("");
      setComplaint("");
    } catch (error) {
      console.error(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="complaint-card">
      <h2>📩 Complaint Box</h2>

      <form onSubmit={submitComplaint}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Enter your complaint..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}
