import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  // ===== Fetch students =====
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===== Add student =====
  const addStudent = async (e) => {
    e.preventDefault();

    if (!name || !rollNumber || !roomNumber) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students", {
        name,
        roll: rollNumber,      // backend expects "roll"
        roomNumber,
      });

      setName("");
      setRollNumber("");
      setRoomNumber("");
      fetchStudents();
    } catch (err) {
      alert("Error adding student");
    }
  };

  // ===== Delete student =====
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Error deleting student");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ===== ADD STUDENT CARD ===== */}
      <h2>Add Student</h2>
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <input
          type="number"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <button type="submit">Add Student</button>
      </form>

      {/* ===== STUDENTS TABLE ===== */}
      <h2>Students List</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.roomNumber}</td>
                <td>
                  <button onClick={() => deleteStudent(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
