import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    rooms: 0,
    leaves: 0,
    complaints: 0,
    fees: 0,
    notices: 0,   // ✅ added
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        studentsRes,
        roomsRes,
        leavesRes,
        complaintsRes,
        noticesRes,   // ✅ added
      ] = await Promise.all([
        fetch("http://localhost:5000/api/students"),
        fetch("http://localhost:5000/api/rooms"),
        fetch("http://localhost:5000/api/leaves"),
        fetch("http://localhost:5000/api/complaints"),
        fetch("http://localhost:5000/api/notices"), // ✅ added
      ]);

      const students = await studentsRes.json();
      const roomsData = await roomsRes.json();
      const leaves = await leavesRes.json();
      const complaints = await complaintsRes.json();
      const notices = await noticesRes.json(); // ✅ added

      let roomsCount = 0;

      if (Array.isArray(roomsData)) {
        roomsCount = roomsData.length;
      } else if (roomsData.rooms && Array.isArray(roomsData.rooms)) {
        roomsCount = roomsData.rooms.length;
      }

      setStats({
        students: Array.isArray(students) ? students.length : 0,
        rooms: roomsCount,
        leaves: Array.isArray(leaves) ? leaves.length : 0,
        complaints: Array.isArray(complaints) ? complaints.length : 0,
        fees: Array.isArray(students) ? students.length : 0,
        notices: notices.count || 0, // ✅ added
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleHover = (e, enter) => {
    e.currentTarget.style.transform = enter
      ? "translateY(-6px)"
      : "translateY(0)";
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Admin Dashboard</h2>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <p style={{ fontSize: "18px", color: "#6d4c41", marginBottom: "5px" }}>
          Welcome back, Admin 👋
        </p>
        
        <p style={{ fontSize: "13px", color: "#a1887f", marginTop: "5px" }}>
          {new Date().toDateString()}
        </p>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading dashboard data...</p>
      ) : (
        <div className="row text-center mt-4">

          {/* Students */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/students")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>👨‍🎓 Students</h5>
              <h3>{stats.students}</h3>
            </div>
          </div>

          {/* Rooms */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/rooms")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>🏠 Rooms</h5>
              <h3>{stats.rooms}</h3>
            </div>
          </div>

          {/* Leaves */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/admin-leaves")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>📝 Leaves</h5>
              <h3>{stats.leaves}</h3>
            </div>
          </div>

          {/* Fees */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/admin-fees")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>💰 Fees</h5>
              <h3>{stats.fees}</h3>
            </div>
          </div>

          {/* Complaints */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/complaints")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>⚠ Complaints</h5>
              <h3>{stats.complaints}</h3>
            </div>
          </div>

          {/* Notices (Now Same Size) */}
          <div className="col-md-3 mb-4">
            <div
              className="card shadow p-4"
              style={cardStyle}
              onClick={() => navigate("/admin-notices")}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              <h5>📢 Notices</h5>
              <h3>{stats.notices}</h3>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}