const express = require("express");
const { isUserAuthenticated } = require("../middlewears/isUserAuthenticated");
const { getUserTasks } = require("../controlers/tasks/getUserTasks");
const { updateTask } = require("../controlers/tasks/updateTask");
const { createTask } = require("../controlers/tasks/createTask");
const { deleteTask } = require("../controlers/tasks/deleteTask");
const router = express.Router();

router.post("/create-task", isUserAuthenticated, createTask);
router.get("/get-user-tasks", isUserAuthenticated, getUserTasks);
router.patch("/update-task", isUserAuthenticated, updateTask);
router.delete("/delete-task/:taskId", isUserAuthenticated, deleteTask);

module.exports = router;
