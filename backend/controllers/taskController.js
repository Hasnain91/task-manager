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
        success: false,
        message: "Task with this title already exists in this status group",
      });
    }

    const task = await Task.create({ title, description, deadline, status });
    res
      .status(201)
      .json({ success: true, message: "Task added successfully!", data: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createTask controller:: ".red, error.mesaage);
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
    console.log("Error in getAllTasks Controller: ".red, error);
  }
};

// update taks
const updateTask = async (req, res) => {
  try {
    console.log("Update request body:".green, req.body);
    const { title, description, deadline, status } = req.body;
    const { id } = req.params;

    if (!title || title.length > 100) {
      return res.status(400).json({ success: false, message: "Invalid Title" });
    }

    if (description && description.length > 500) {
      return res
        .status(400)
        .json({ success: false, message: "Description Too Long" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    // Prevent duplicate task in the same status grp
    const duplicate = await Task.findOne({
      _id: { $ne: task._id },
      title,
      status,
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Duplicate task in the same status group",
      });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.deadline = deadline;

    const updated = await task.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in updateTask Controller: ".red, error);
  }
};

// delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task Deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deleteTask Controller: ".red, error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
