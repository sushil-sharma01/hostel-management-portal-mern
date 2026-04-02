import React, { useState } from "react";
import axios from "axios";

export default function AddRoom({ refreshRooms }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const addRoom = async () => {
    if (!roomNumber || !capacity) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/rooms/add", {
        roomNumber: Number(roomNumber),
        capacity: Number(capacity),
      });

      setRoomNumber("");
      setCapacity("");
      refreshRooms(); // reload list
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error while adding room");
    }
  };

  return (
    <div className="card">
      <h2>Add Room</h2>

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

      <button className="btn" onClick={addRoom}>
        Add Room
      </button>
    </div>
  );
}
