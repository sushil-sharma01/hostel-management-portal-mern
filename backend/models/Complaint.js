const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
