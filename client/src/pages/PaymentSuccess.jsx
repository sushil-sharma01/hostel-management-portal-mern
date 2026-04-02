import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/button.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <div className="payment-card">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/fees")}
          className="back-btn"
        >
          ← Back to Fees
        </button>

        {/* CONTENT */}
        <h2 style={{ marginTop: "10px" }}>Payment Successful</h2>
        <p>Your hostel fee has been paid successfully.</p>

      </div>
    </div>
  );
}