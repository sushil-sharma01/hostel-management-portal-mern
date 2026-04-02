const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

  student: {
    type: String,   // store email
    required: true
  },

  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);