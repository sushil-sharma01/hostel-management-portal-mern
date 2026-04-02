import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Hide navbar if not logged in
  if (!role) return null;

  const getLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#5c4630" : "black",
    fontWeight: isActive ? "600" : "500",
    paddingBottom: "4px",
    borderBottom: isActive
      ? "3px solid #8b6f47"
      : "3px solid transparent",
    transition: "all 0.3s ease",
  });

  return (
    <nav
      style={{
        backgroundColor: "#d8c3a5",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT SIDE TITLE */}
      <h4 style={{ margin: 0 }}>Hostel Management</h4>

      {/* RIGHT SIDE MENU */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* ================= ADMIN MENU ================= */}
        {role === "admin" && (
          <>
            <NavLink to="/dashboard" style={getLinkStyle}>
              Dashboard
            </NavLink>

            <NavLink to="/students" style={getLinkStyle}>
              Students
            </NavLink>

            <NavLink to="/rooms" style={getLinkStyle}>
              Rooms
            </NavLink>

            <NavLink to="/admin-leaves" style={getLinkStyle}>
              Leaves
            </NavLink>

            <NavLink to="/admin-fees" style={getLinkStyle}>
              Fees
            </NavLink>

            <NavLink to="/complaints" style={getLinkStyle}>
              Complaints
            </NavLink>

            <NavLink to="/admin-notices" style={getLinkStyle}>
              Notices
            </NavLink>
          </>
        )}

        {/* ================= STUDENT MENU ================= */}
        {role === "student" && (
          <>
            <NavLink to="/student" style={getLinkStyle}>
              Dashboard
            </NavLink>

            <NavLink to="/leave" style={getLinkStyle}>
              Leave
            </NavLink>

            <NavLink to="/fees" style={getLinkStyle}>
              Fees
            </NavLink>

            <NavLink to="/notice" style={getLinkStyle}>
              Notice
            </NavLink>

            <NavLink to="/student-complaints" style={getLinkStyle}>
              Complaints
            </NavLink>

            <NavLink to="/change-password" style={getLinkStyle}>
              Change Password
            </NavLink>
          </>
        )}

        {/* ================= LOGOUT ================= */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#b08968",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;