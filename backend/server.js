const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(chatRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Hospital Information Agent Backend is Running");
});

// Render provides the PORT in production.
// Use 5000 when running locally.
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});