import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminFees() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [paidCount, setPaidCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");

      // Calculate pending for each student
      const updatedStudents = res.data.map((student) => {
        const total = student.totalFees || 50000;
        const paid = student.paidFees || 0;
        return {
          ...student,
          totalFees: total,
          paidFees: paid,
          pendingFees: total - paid,
        };
      });

      setStudents(updatedStudents);

      let paid = 0;
      let pending = 0;

      updatedStudents.forEach((student) => {
        if (student.pendingFees === 0) {
          paid++;
        } else {
          pending++;
        }
      });

      setPaidCount(paid);
      setPendingCount(pending);
    } catch (error) {
      console.log("Error fetching fees:", error);
    }
  };

  const applyFilters = useCallback(() => {
    let data = [...students];

    if (search) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.roll.toString().includes(search)
      );
    }

    if (filter === "paid") {
      data = data.filter((s) => s.pendingFees === 0);
    } else if (filter === "pending") {
      data = data.filter((s) => s.pendingFees > 0);
    }

    setFilteredStudents(data);
  }, [students, search, filter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const thStyle = {
    padding: "14px",
    border: "1px solid #dcdcdc",
    backgroundColor: "#e6d5b8",
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
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#4e342e",
            fontWeight: "600",
          }}
        >
          💰 Fees Management
        </h2>

        <p><strong>Total Students:</strong> {students.length}</p>
        <p style={{ color: "green" }}>
          <strong>Paid:</strong> {paidCount}
        </p>
        <p style={{ color: "red", marginBottom: "20px" }}>
          <strong>Pending:</strong> {pendingCount}
        </p>

        {/* SEARCH */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Search by Name or Roll..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "30px",
              border: "1px solid #c5a97f",
              outline: "none",
            }}
          />
        </div>

        {/* FILTER BUTTONS */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setFilter("all")}
            style={filterButtonStyle(filter === "all")}
          >
            All
          </button>

          <button
            onClick={() => setFilter("paid")}
            style={filterButtonStyle(filter === "paid")}
          >
            Paid
          </button>

          <button
            onClick={() => setFilter("pending")}
            style={filterButtonStyle(filter === "pending")}
          >
            Pending
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Roll</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Pending</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.roll}</td>
                  <td style={tdStyle}>₹{s.totalFees}</td>
                  <td style={{ ...tdStyle, color: "green" }}>
                    ₹{s.paidFees}
                  </td>
                  <td style={{ ...tdStyle, color: "red" }}>
                    ₹{s.pendingFees}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const filterButtonStyle = (active) => ({
  padding: "6px 16px",
  borderRadius: "20px",
  border: active ? "none" : "1px solid #c5a97f",
  backgroundColor: active ? "#c8a97e" : "#ffffff",
  color: active ? "#ffffff" : "#4e342e",
  cursor: "pointer",
  fontWeight: "500",
});