import React, { useEffect, useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [students, setStudents] = useState([]);

  // ===== Load students =====
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===== Add student =====
  const addStudent = async (e) => {
    e.preventDefault();

    if (!name || !roll || !roomNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students/add", {
        name,
        roll,
        roomNumber,
      });

      setName("");
      setRoll("");
      setRoomNumber("");
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  // ===== Delete student =====
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hostel Management</h1>

      {/* ===== Add Student Form ===== */}
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      {/* ===== Students Table ===== */}
      <h2>Students</h2>

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
};

export default AddStudent;
