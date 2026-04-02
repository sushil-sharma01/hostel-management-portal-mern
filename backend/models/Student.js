const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    roll: {
      type: Number,
      required: true,
      unique: true,
    },

    email: {
  type: String,
  required: true,
  unique: true
},

    roomNumber: {
      type: Number,
      required: true,
    },

    totalFees: {
      type: Number,
      default: 50000,
    },

    paidFees: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);