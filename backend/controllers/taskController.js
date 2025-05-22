const Task = require("../models/taskModel");
const colors = require("colors");

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
    console.log("Intern Server Error: ".red, error.mesaage);
  }
};

// get all tasks (filtering and search too)
const getAllTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let tasks = await Task.find(query).sort("-updatedAt");

    tasks = tasks.map((task) => {
      const isOverdue = task.deadline && new Date(task.deadline) < new Date();

      return { ...task._doc, isOverdue };
    });

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Intern Server Error: ".red, error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
};
