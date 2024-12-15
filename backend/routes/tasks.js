const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
});

// Get All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
});

module.exports = router;
