const express = require("express");
const { createTask, getAllTasks } = require("../controllers/taskController");

const router = express.Router();

router.route("/").post(createTask).get(getAllTasks);

module.exports = router;
