const dns = require("node:dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("User Authentication API is running!");
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// Protected profile route
app.get(
  "/api/auth/profile",
  require("./middleware/authMiddleware"),
  (req, res) => {
    res.json({
      message: "Authentication successful!",
      userId: req.user.userId
    });
  }
);

const PORT = process.env.PORT || 5001;

// Check required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Error: MONGO_URI and JWT_SECRET must be set in .env");
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });