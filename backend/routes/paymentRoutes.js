const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amount, user } = req.body;

    res.json({
      message: "Payment stored successfully",
      amount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing payment" });
  }
});

module.exports = router;