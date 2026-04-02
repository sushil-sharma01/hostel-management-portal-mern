import React, { useState, useEffect, useCallback } from "react";
import "../styles/leave.css";

export default function Leave() {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const [filter, setFilter] = useState("all");

  const email = localStorage.getItem("email");



  // ================= FETCH LEAVES =================
  const fetchLeaves = useCallback(async () => {
    try {

      const res = await fetch(
        `http://localhost:5000/api/leaves/student/${email}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setLeaves(data);
        setFilteredLeaves(data);
      } else {
        setLeaves([]);
        setFilteredLeaves([]);
      }

    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLeaves([]);
      setFilteredLeaves([]);
    }

  }, [email]);



  // ================= LOAD ON PAGE OPEN =================
  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);



  // ================= APPLY LEAVE =================
  const applyLeave = async () => {

    if (!fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      alert("Invalid date range");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: email,
          from: fromDate,
          to: toDate,
          reason,
        }),
      });

      await res.json();

      alert("Leave Applied Successfully ✅");

      setFromDate("");
      setToDate("");
      setReason("");

      fetchLeaves(); // refresh table

    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };



  // ================= FILTER LOGIC =================
  const applyFilter = useCallback(() => {

    let data = [...leaves];

    if (filter !== "all") {
      data = data.filter(
        (leave) => leave.status.toLowerCase() === filter
      );
    }

    setFilteredLeaves(data);

  }, [filter, leaves]);



  useEffect(() => {
    applyFilter();
  }, [applyFilter]);



  return (

    <div className="leave-container">

      <h2 className="leave-title">Leave Application</h2>


      {/* APPLY LEAVE FORM */}

      <div className="leave-card">

        <label>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <textarea
          placeholder="Enter Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button onClick={applyLeave}>
          Apply Leave
        </button>

      </div>



      {/* LEAVE HISTORY */}

      <div className="leave-history">

        <h3>Leave History</h3>


        {/* FILTER BUTTONS */}

        <div className="leave-filters">

          {["all", "pending", "approved", "rejected"].map((type) => (

            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn ${
                filter === type ? "active-filter" : ""
              }`}
            >

              {type.charAt(0).toUpperCase() + type.slice(1)}

            </button>

          ))}

        </div>



        <table>

          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>


          <tbody>

            {filteredLeaves.length === 0 ? (

              <tr>
                <td colSpan="4">No leaves applied yet</td>
              </tr>

            ) : (

              filteredLeaves.map((leave, index) => (

                <tr key={index}>

                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.reason}</td>

                  <td className={`status-${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}