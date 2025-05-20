const Task = require("../models/taskModel");

// Create new Task
const createTask = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    // Validation
    if (!title || title.length > 100) {
      return res.status(400).json({ message: "Invalid title" });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ message: "Description too long" });
    }

    // Prevent duplicate titles in the same status group
    const duplicate = await Task.findOne({ title, status });
    if (duplicate) {
      return res.status(400).json({
        message: "Task with this title already exists in this status group",
      });
    }

    const task = await Task.create({ title, description, deadline, status });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
};
