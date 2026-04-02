import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchStudent = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/students"
        );

        const foundStudent = res.data.find(
          (s) => s.email === email
        );

        if (!foundStudent) {
          setError("Student not found");
        } else {
          setStudent(foundStudent);
        }

        setLoading(false);

      } catch (err) {
        console.log(err);
        setError("Failed to load student data");
        setLoading(false);
      }
    };

    fetchStudent();

  }, [email]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  const totalFees = 50000;
  const paid = student?.paidFees || 0;
  const pending = totalFees - paid;
  const progress = Math.round((paid / totalFees) * 100);

  return (
    <div className="container mt-5">

      <div className="card text-center p-4 shadow mb-4">
        <h4>Welcome back, {name} 👋</h4>
        <p className="text-muted">Have a productive day!</p>
      </div>

      <div className="card p-4 shadow mb-4">
        <h5>📢 Latest Notice</h5>
        <p>Water maintenance from 10AM - 2PM.</p>
      </div>

      <h2 className="text-center mb-4">Student Dashboard</h2>

      <div className="card p-4 shadow mb-4">
        <h5>👤 Student Information</h5>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll No:</strong> {student.roll}</p>
        <p><strong>Room No:</strong> {student.roomNumber}</p>
      </div>

      <div className="row">

        <div className="col-md-6">
          <div className="card p-4 shadow mb-4">
            <h5>💰 Fee Details</h5>
            <p>Total Fees: ₹{totalFees}</p>
            <p>Paid: ₹{paid}</p>
            <p style={{ color: "red" }}>Pending: ₹{pending}</p>

            <div className="text-center mt-3">
              <div
                style={{
                  background: `conic-gradient(#198754 ${progress}%, #ddd 0%)`,
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  margin: "0 auto"
                }}
              >
                {progress}%
              </div>
            </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow mb-4">
            <h5>🏠 Room Details</h5>
            <p>Room Number: {student.roomNumber}</p>
            <p>Status: Occupied</p>
          </div>
        </div>

      </div>

    </div>
  );
}