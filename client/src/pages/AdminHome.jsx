import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    roomsFull: 0,
    roomsAvailable: 0,
  });

  const adminName = localStorage.getItem("name") || "Admin";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>Welcome back, {adminName} 👋</h1>
      <p style={subtitle}>Here’s what’s happening in your hostel today.</p>

      <div style={cardContainer}>
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon="🎓"
          color="#6C63FF"
          onClick={() => navigate("/students")}
        />

        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon="🏠"
          color="#FF8C42"
          onClick={() => navigate("/rooms")}
        />

        <StatCard
          title="Rooms Full"
          value={stats.roomsFull}
          icon="🔴"
          color="#E63946"
          onClick={() => navigate("/rooms")}
        />

        <StatCard
          title="Rooms Available"
          value={stats.roomsAvailable}
          icon="🟢"
          color="#2A9D8F"
          onClick={() => navigate("/rooms")}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ ...card, borderTop: `5px solid ${color}` }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <div style={iconStyle}>{icon}</div>
      <h3 style={cardTitle}>{title}</h3>
      <p style={cardValue}>{value}</p>
    </div>
  );
};

const container = {
  padding: "60px",
  background: "linear-gradient(to right, #f8f6f2, #f3efe7)",
  minHeight: "100vh",
};

const title = {
  fontSize: "30px",
  marginBottom: "5px",
  color: "#4B2E1E",
};

const subtitle = {
  marginBottom: "40px",
  color: "#777",
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
};

const card = {
  backgroundColor: "white",
  padding: "35px",
  borderRadius: "16px",
  boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
  textAlign: "center",
  transition: "0.3s ease",
  cursor: "pointer",
};

const iconStyle = {
  fontSize: "32px",
  marginBottom: "15px",
};

const cardTitle = {
  fontSize: "18px",
  marginBottom: "12px",
  color: "#555",
};

const cardValue = {
  fontSize: "30px",
  fontWeight: "bold",
  color: "#4B2E1E",
};

export default AdminHome;
