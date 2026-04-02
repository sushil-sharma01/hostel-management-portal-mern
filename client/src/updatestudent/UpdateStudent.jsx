import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    roomNumber: "",
    course: "",
    year: "",
    feesPaid: false,
  });

  // Fetch single student
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student/${id}`);
      setStudent(res.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateForm = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/update/student/${id}`, student);
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Student</h2>

      <form onSubmit={updateForm} className="mt-3">

        <input
          type="text"
          name="name"
          value={student.name}
          className="form-control mb-2"
          onChange={inputHandler}
          required
        />

        <input
          type="email"
          name="email"
          value={student.email}
          className="form-control mb-2"
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="phone"
          value={student.phone}
          className="form-control mb-2"
          onChange={inputHandler}
        />

        <input
          type="text"
          name="roomNumber"
          value={student.roomNumber}
          className="form-control mb-2"
          onChange={inputHandler}
        />

        <input
          type="text"
          name="course"
          value={student.course}
          className="form-control mb-2"
          onChange={inputHandler}
        />

        <input
          type="number"
          name="year"
          value={student.year}
          className="form-control mb-2"
          onChange={inputHandler}
        />

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="feesPaid"
            checked={student.feesPaid}
            className="form-check-input"
            onChange={inputHandler}
          />
          <label className="form-check-label">Fees Paid</label>
        </div>

        <button className="btn btn-warning">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
