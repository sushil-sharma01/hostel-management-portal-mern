import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminLeaves() {

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    fetchLeaves();
  }, []);



  const fetchLeaves = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/leaves");

      setLeaves(res.data);
      setFilteredLeaves(res.data);

    } catch (err) {
      console.log("Error fetching leaves:", err);
    }
  };



  // ================= FILTER LOGIC =================
  const applyFilters = useCallback(() => {

    let data = [...leaves];

    // 🔎 Search by reason
    if (search) {
      data = data.filter((leave) =>
        leave.reason?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🎯 Status filter
    if (filter !== "all") {
      data = data.filter(
        (leave) => leave.status?.toLowerCase() === filter
      );
    }

    setFilteredLeaves(data);

  }, [search, filter, leaves]);



  useEffect(() => {
    applyFilters();
  }, [applyFilters]);



  // ================= APPROVE / REJECT =================
  const updateStatus = async (id, status) => {
    try {

      await axios.put(`http://localhost:5000/api/leaves/${id}`, {
        status
      });

      fetchLeaves();

    } catch (err) {
      console.log("Error updating leave:", err);
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
          Manage Leaves
        </h2>


        {/* 🔎 SEARCH */}

        <div style={{ marginBottom: "15px" }}>

          <input
            type="text"
            placeholder="Search by Reason..."
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



        {/* 🎯 FILTER BUTTONS */}

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
              <th style={thStyle}>From</th>
              <th style={thStyle}>To</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>



          <tbody>

            {filteredLeaves.length > 0 ? (

              filteredLeaves.map((leave) => (

                <tr key={leave._id}>

                  <td style={tdStyle}>
                    {leave.from || leave.fromDate}
                  </td>

                  <td style={tdStyle}>
                    {leave.to || leave.toDate}
                  </td>

                  <td style={tdStyle}>
                    {leave.reason}
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color:
                        leave.status === "Approved"
                          ? "green"
                          : leave.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {leave.status}
                  </td>



                  <td style={tdStyle}>

                    {leave.status === "Pending" && (

                      <>
                        <button
                          onClick={() =>
                            updateStatus(leave._id, "Approved")
                          }
                          style={{
                            padding: "6px 12px",
                            marginRight: "8px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Approve
                        </button>


                        <button
                          onClick={() =>
                            updateStatus(leave._id, "Rejected")
                          }
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
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
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No leaves found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}



// ================= FILTER BUTTON STYLE =================

const filterButtonStyle = (active) => ({
  padding: "6px 16px",
  borderRadius: "20px",
  border: active ? "none" : "1px solid #c5a97f",
  backgroundColor: active ? "#c8a97e" : "#ffffff",
  color: active ? "#ffffff" : "#4e342e",
  cursor: "pointer",
  fontWeight: "500",
});