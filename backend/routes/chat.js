const express = require("express");
const { getGeminiReply } = require("../services/geminiService");
const { getHospitalData } = require("../services/hospitalDataService");

const router = express.Router();

router.get("/hospital-data", (req, res) => {
  try {
    const data = getHospitalData();
    return res.json(data);
  } catch (error) {
    console.error("Error retrieving hospital data:", error);
    return res.status(500).json({ error: error.message || "Failed to retrieve hospital data" });
  }
});


router.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Request body must include a valid 'message' string." });
    }

    const reply = await getGeminiReply(message, history);
    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred while processing the chat request." });
  }
});

module.exports = router;
