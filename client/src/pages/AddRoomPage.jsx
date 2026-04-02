import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRoomPage() {
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();

    if (!roomNumber || !capacity) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/rooms", {
        roomNumber,
        capacity,
      });

      alert("Room Added Successfully ✅");
      navigate("/rooms");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding room");
    }
  };

  return (
    <div className="payment-container">

      <button
        onClick={() => navigate("/rooms")}
        className="back-btn"
      >
        ← Back to Rooms
      </button>

      <h2>Add Room</h2>

      <form onSubmit={handleAddRoom} className="payment-form">
        <input
          type="number"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}