const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// All note routes require authentication
router.use(authenticateToken);

// Create a note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      user: req.user.userId
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    console.error("Create note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all notes belonging to the logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    console.error("Get notes error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get one note
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Get note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const { title, content } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updates.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== "string" || !content.trim()) {
        return res.status(400).json({ message: "Content cannot be empty" });
      }
      updates.content = content.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide a title or content to update"
      });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error("Update note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
