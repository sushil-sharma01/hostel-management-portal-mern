const Leave = require("../models/Leave");

// GET ALL LEAVES (Admin)
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("student", "name roll roomNumber");

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};