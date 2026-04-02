const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ================= GET ALL STUDENTS =================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ roll: 1 });
    res.json(students);
  } catch (err) {
    console.error("GET STUDENTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET STUDENT PROFILE BY EMAIL =================
router.get("/profile/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ADD STUDENT =================
router.post("/", async (req, res) => {
  try {
    let { name, roll, email, roomNumber, totalFees, paidFees } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    roll = Number(roll);
    roomNumber = Number(roomNumber);

    if (!name || !roll || !email || !roomNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // create student record
    const newStudent = new Student({
      name,
      roll,
      email,
      roomNumber,
      totalFees: totalFees || 50000,
      paidFees: paidFees || 0
    });

    const savedStudent = await newStudent.save();

    // create login user
    const hashedPassword = await bcrypt.hash("1234", 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    await newUser.save();

    res.status(201).json({
      message: "Student added successfully",
      student: savedStudent
    });

  } catch (err) {
    console.error("ADD STUDENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= DELETE STUDENT =================
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // delete login account also
    await User.findOneAndDelete({ email: student.email });

    res.json({ message: "Student deleted successfully" });

  } catch (err) {
    console.error("DELETE STUDENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= PAY FEES =================
router.put("/pay/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.paidFees += Number(amount);

    if (student.paidFees > student.totalFees) {
      student.paidFees = student.totalFees;
    }

    await student.save();

    res.json({
      message: "Payment successful",
      paidFees: student.paidFees,
      totalFees: student.totalFees
    });

  } catch (err) {
    console.error("PAY FEES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;