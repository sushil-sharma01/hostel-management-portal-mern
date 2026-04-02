const Student = require("../models/Student");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const Leave = require("../models/Leave");
const Notice = require("../models/Notice");

exports.getDashboard = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const rooms = await Room.countDocuments();
    const complaints = await Complaint.countDocuments();
    const leaves = await Leave.countDocuments();
    const notices = await Notice.countDocuments(); // THIS FIXES IT

    const roomsFull = await Room.countDocuments({ status: "Full" });
    const roomsAvailable = await Room.countDocuments({ status: "Available" });

    const studentList = await Student.find();

    let totalFees = 0;
    let feesPaid = 0;
    let feesPending = 0;

    studentList.forEach((s) => {
      totalFees += s.totalFees || 0;
      feesPaid += s.paidFees || 0;
      feesPending += s.pendingFees || 0;
    });

    res.json({
      students,
      rooms,
      leaves,
      complaints,
      notices,   // IMPORTANT
      roomsFull,
      roomsAvailable,
      totalFees,
      feesPaid,
      feesPending
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};