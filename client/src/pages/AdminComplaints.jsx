import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
      setFilteredComplaints(res.data);
    } catch (err) {
      console.log("Error fetching complaints:", err);
    }
  };

  // ✅ FILTER LOGIC
  const applyFilters = useCallback(() => {
    let data = [...complaints];

    // 🔎 Search filter
    if (search) {
      data = data.filter(
        (c) =>
          (c.studentName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (c.complaint || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // 🎯 Status filter
    if (filter !== "all") {
      data = data.filter(
        (c) => c.status.toLowerCase() === filter
      );
    }

    setFilteredComplaints(data);
  }, [search, filter, complaints]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        { status }
      );
      fetchComplaints();
    } catch (err) {
      console.log("Error updating complaint:", err);
    }
  };

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
    <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
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
          All Complaints
        </h2>

        {/* 🔎 Search */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Search by Student or Complaint..."
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

        {/* 🎯 Filter Buttons */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          {["all", "approved", "pending", "rejected"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={filterButtonStyle(filter === type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
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
              <th style={thStyle}>Student</th>
              <th style={thStyle}>Complaint</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((c) => (
                <tr key={c._id}>
                  <td style={tdStyle}>{c.studentName || "Unknown"}</td>
                  <td style={tdStyle}>{c.complaint}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color:
                        c.status === "Approved"
                          ? "green"
                          : c.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {c.status}
                  </td>
                  <td style={tdStyle}>
                    {c.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(c._id, "Approved")
                          }
                          style={approveBtn}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(c._id, "Rejected")
                          }
                          style={rejectBtn}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🎨 Filter button style
const filterButtonStyle = (active) => ({
  padding: "6px 16px",
  borderRadius: "20px",
  border: active ? "none" : "1px solid #c5a97f",
  backgroundColor: active ? "#c8a97e" : "#ffffff",
  color: active ? "#ffffff" : "#4e342e",
  cursor: "pointer",
  fontWeight: "500",
});

const approveBtn = {
  padding: "6px 12px",
  marginRight: "8px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};