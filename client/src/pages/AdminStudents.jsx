import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        All Students
      </h2>

      <table
        style={{
          width: "80%",
          margin: "0 auto",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#f3efe7" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Roll</th>
            <th style={thStyle}>Room</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={tdStyle}>{student.name}</td>
              <td style={tdStyle}>{student.roll}</td>
              <td style={tdStyle}>{student.roomNumber}</td>
              <td style={tdStyle}>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  borderBottom: "1px solid #eee",
};
