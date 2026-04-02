import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/payment.css";

export default function Payment() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  const handlePayment = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!cardNumber || !cardName || !cvv || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (cardNumber.length < 12) {
      alert("Invalid Card Number");
      return;
    }

    if (cvv.length !== 3) {
      alert("Invalid CVV");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `http://localhost:5000/api/students/pay/${email}`,
        {
          amount: Number(amount),
        }
      );

      // ✅ Success
      alert(`Payment of ₹${amount} Successful ✅`);

      // reset form
      setCardNumber("");
      setCardName("");
      setCvv("");
      setAmount("");

      // redirect
      navigate("/payment-success");

    } catch (err) {
      alert(
        err.response?.data?.message || "Payment failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">

      <button
        onClick={() => navigate("/fees")}
        className="back-btn"
      >
        ← Back to Fees
      </button>

      <h2>Payment Gateway</h2>

      <form onSubmit={handlePayment} className="payment-form">

        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength="16"
        />

        <input
          type="text"
          placeholder="Card Holder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength="3"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </form>
    </div>
  );
}