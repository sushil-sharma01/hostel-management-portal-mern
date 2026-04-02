const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// ================= CREATE NOTICE =================
router.post("/", async (req, res) => {
  try {
    const { title, message } = req.body;

    // Validation
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const notice = new Notice({
      title: title || "Notice",
      message,
    });

    const savedNotice = await notice.save();

    res.status(201).json({
      success: true,
      data: savedNotice,
    });

  } catch (error) {
    console.error("CREATE NOTICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating notice",
    });
  }
});


// ================= GET ALL NOTICES =================
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });

  } catch (error) {
    console.error("GET NOTICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching notices",
    });
  }
});


// ================= DELETE NOTICE =================
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    await notice.deleteOne();   // ✅ better than findByIdAndDelete again

    res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });

  } catch (error) {
    console.error("DELETE NOTICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting notice",
    });
  }
});

module.exports = router;