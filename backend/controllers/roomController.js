const Room = require("../models/Room");

// ================= ADD ROOM =================
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;

    if (!roomNumber || !capacity) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check duplicate room
    const existing = await Room.findOne({ roomNumber });
    if (existing) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const room = await Room.create({
      roomNumber,
      capacity,
      occupied: 0,
      available: capacity,
      status: "Available",
    });

    res.json(room);
  } catch (err) {
    console.error("ROOM ADD ERROR:", err);
    res.status(500).json({ message: "Server error while adding room" });
  }
};

// ================= GET ALL ROOMS =================
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE ROOM =================
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
