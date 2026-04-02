import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
      setFilteredStudents(res.data); // ✅ IMPORTANT
    } catch (err) {
      console.log("Error fetching students:", err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = students.filter(
      (s) =>
        s.name.toLowerCase().includes(value.toLowerCase()) ||
        s.roll.toString().includes(value) ||
        s.roomNumber.toString().includes(value)
    );

    setFilteredStudents(filtered);
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log("Error deleting student:", err);
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
          Students List
        </h2>

        {/* ✅ SEARCH BAR */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by Name, Roll or Room..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "30px",
              border: "1px solid #c5a97f",
              outline: "none",
            }}
          />
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
              <th style={thStyle}>Room</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.roll}</td>
                  <td style={tdStyle}>{s.roomNumber}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => deleteStudent(s._id)}
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
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => navigate("/add-student")}
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
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}