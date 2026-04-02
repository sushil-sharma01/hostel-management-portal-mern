import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data.rooms);
      setFilteredRooms(res.data.rooms);
    } catch (error) {
      console.log("Error fetching rooms");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    const filtered = rooms.filter((room) =>
      room.roomNumber.toString().includes(search)
    );
    setFilteredRooms(filtered);
  }, [search, rooms]);

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      alert("Error deleting room");
    }
  };

  const thStyle = {
    padding: "14px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#e6d5b8", // ✅ exact same shade
    color: "#4e342e",
    fontWeight: "600",
    textAlign: "left",  
  };

  const tdStyle = {
    padding: "14px",
    border: "1px solid #e0e0e0",
    textAlign: "left",  
  };

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1100px",
          backgroundColor: "#ffffff",
          padding: "30px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#4e342e",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Rooms Management
        </h3>

        <p style={{ color: "#8b6f47", marginBottom: "20px" }}>
          Total Rooms: <strong>{rooms.length}</strong>
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Room Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 20px",
            marginBottom: "25px",
            borderRadius: "20px",
            border: "1px solid #d2b48c",
          }}
        />

        {/* Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Room No</th>
              <th style={thStyle}>Capacity</th>
              <th style={thStyle}>Occupied</th>
              <th style={thStyle}>Available</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room._id}>
                  <td style={tdStyle}>{room.roomNumber}</td>
                  <td style={tdStyle}>{room.capacity}</td>
                  <td style={tdStyle}>{room.occupied}</td>
                  <td style={tdStyle}>
                    {room.capacity - room.occupied}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontWeight: "600",
                        color:
                          room.capacity - room.occupied > 0
                            ? "#2e7d32"
                            : "#c62828",
                      }}
                    >
                      {room.capacity - room.occupied > 0
                        ? "Available"
                        : "Full"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => deleteRoom(room._id)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "#d9534f",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "20px" }}>
                  No Rooms Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Room Button */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => navigate("/add-room")}
            style={{
              padding: "10px 25px",
              backgroundColor: "#c8a97e",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}