const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// =============================
// ➤ GET ALL ROOMS
// =============================
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });

    res.json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching rooms",
    });
  }
});

// =============================
// ➤ ADD ROOM
// =============================
router.post("/", async (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;

    if (!roomNumber || !capacity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Prevent duplicate room
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const newRoom = new Room({
      roomNumber,
      capacity,
      occupied: 0,
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: newRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding room",
    });
  }
});

// =============================
// ➤ DELETE ROOM
// =============================
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting room",
    });
  }
});

module.exports = router;
