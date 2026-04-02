const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

// ================= CREATE COMPLAINT =================
router.post("/", async (req, res) => {
  try {
    const { studentName, complaint } = req.body;

    const newComplaint = new Complaint({
      studentName,
      complaint,
      status: "Pending",
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL COMPLAINTS =================
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE STATUS =================
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE COMPLAINT =================
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
