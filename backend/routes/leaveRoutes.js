const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");


// ================= APPLY LEAVE =================
router.post("/", async (req, res) => {
  try {
    const { student, from, to, reason } = req.body;

    if (!student || !from || !to || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(from) > new Date(to)) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const leave = new Leave({
      student, // storing student email
      from,
      to,
      reason,
      status: "Pending",
    });

    await leave.save();

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating leave" });
  }
});


// ================= GET LEAVES FOR STUDENT =================
router.get("/student/:email", async (req, res) => {
  try {

    const leaves = await Leave.find({
      student: req.params.email
    }).sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching leaves" });
  }
});


// ================= GET ALL LEAVES (ADMIN) =================
router.get("/", async (req, res) => {
  try {

    const leaves = await Leave.find().sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    res.status(500).json({ message: "Error fetching leaves" });
  }
});


// ================= APPROVE / REJECT LEAVE =================
router.put("/:id", async (req, res) => {
  try {

    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.json(updatedLeave);

  } catch (error) {
    res.status(500).json({ message: "Error updating leave status" });
  }
});


// ================= DELETE LEAVE =================
router.delete("/:id", async (req, res) => {
  try {

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    await Leave.findByIdAndDelete(req.params.id);

    res.json({ message: "Leave deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting leave" });
  }
});


module.exports = router;