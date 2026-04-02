const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupied: {
    type: Number,
    default: 0,
  },
});

// 🔥 Virtual fields (auto calculate)
roomSchema.virtual("available").get(function () {
  return this.capacity - this.occupied;
});

roomSchema.virtual("status").get(function () {
  return this.capacity - this.occupied > 0 ? "Available" : "Full";
});

// 👇 Important for virtuals to show in JSON
roomSchema.set("toJSON", { virtuals: true });
roomSchema.set("toObject", { virtuals: true });

module.exports =
  mongoose.models.Room || mongoose.model("Room", roomSchema);
