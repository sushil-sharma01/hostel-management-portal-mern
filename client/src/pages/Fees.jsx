import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Fees() {

  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);

  const email =
  localStorage.getItem("email") ||
  localStorage.getItem("userEmail");

  useEffect(() => {

    const fetchFees = async () => {
      try {

        const res = await axios.get(
          `http://localhost:5000/api/students/profile/${email}`
        );

        setTotal(res.data.totalFees || 0);
        setPaid(res.data.paidFees || 0);

      } catch (err) {
        console.error("Error fetching fees:", err);
      }
    };

    if (email) fetchFees();

  }, [email]);

  const pending = total - paid;
  const percentage = total > 0 ? (paid / total) * 100 : 0;

  return (
    <div className="container mt-5 text-center">

      <h2>Fee Status</h2>

      <div
        className="card p-4 mt-4 shadow"
        style={{ backgroundColor: "#f7f1e3", borderRadius: "12px" }}
      >

        <h5>Total Fees: ₹{total}</h5>
        <h5>Paid: ₹{paid}</h5>
        <h5 style={{ color: "red" }}>Pending: ₹{pending}</h5>

        <div className="progress mt-3" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            style={{
              width: `${percentage}%`,
              backgroundColor: "#c8a97e"
            }}
          >
            {Math.round(percentage)}%
          </div>
        </div>

        {pending > 0 && (
          <button
            className="btn mt-4"
            style={{ backgroundColor: "#c8a97e", color: "white" }}
            onClick={() => navigate("/payment")}
          >
            Pay Now
          </button>
        )}

        {pending === 0 && (
          <h5 className="mt-3" style={{ color: "green" }}>
            Fees Fully Paid ✅
          </h5>
        )}

      </div>

    </div>
  );
}