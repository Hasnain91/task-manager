const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);

module.exports = router;
