const Student = require("../models/Student");
const User = require("../models/User");
const Room = require("../models/Room");
const bcrypt = require("bcryptjs");


// ================= ADD STUDENT =================
exports.addStudent = async (req, res) => {
  try {
    let { name, roll, email, roomNumber } = req.body;

    // Clean values
    name = name?.trim();
    email = email?.trim().toLowerCase();
    roll = Number(roll);
    roomNumber = Number(roomNumber);

    if (!name || !roll || !email || !roomNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check existing roll
    const existingRoll = await Student.findOne({ roll });
    if (existingRoll) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    // Check room
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }

    // Check room capacity
    const studentsInRoom = await Student.countDocuments({ roomNumber });
    if (studentsInRoom >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }

    // Default password
    const hashedPassword = await bcrypt.hash("1234", 10);

    // Create student record
    const newStudent = new Student({
      name,
      roll,
      email,
      roomNumber,
      totalFees: 50000,
      paidFees: 0
    });

    await newStudent.save();

    // Create login account
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    await newUser.save();

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent
    });

  } catch (error) {
    console.error("ADD STUDENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET ALL STUDENTS =================
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ roll: 1 });
    res.json(students);
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET STUDENT PROFILE =================
exports.getStudentProfile = async (req, res) => {
  try {
    const email = req.params.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= PAY FEES =================
exports.payFees = async (req, res) => {
  try {
    const email = req.params.email?.trim().toLowerCase();
    const amount = parseFloat(req.body.amount);

    if (!email || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.paidFees += amount;

    if (student.paidFees > student.totalFees) {
      student.paidFees = student.totalFees;
    }

    await student.save();

    res.json({
      message: "Payment successful",
      paidFees: student.paidFees,
      totalFees: student.totalFees
    });

  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= DELETE STUDENT =================
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete login account
    await User.findOneAndDelete({ email: student.email });

    // Delete student
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });

  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};