const express = require("express");
const { createToken } = require("../AblyService");

const router = express.Router();

router.get("/token", async (req, res) => {
  try {
    const tokenRequest = await createToken();
    res.json(tokenRequest);
  } catch (err) {
    console.error("Ably token error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
