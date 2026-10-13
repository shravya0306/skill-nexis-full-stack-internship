const dns = require("node:dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes App Backend is running!");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("MONGO_URI and JWT_SECRET must be set in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 5002;

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
