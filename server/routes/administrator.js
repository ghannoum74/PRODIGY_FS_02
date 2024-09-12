const express = require("express");
const { isUserAuthenticated } = require("../middlewears/isUserAuthenticated");
const { isAdmin } = require("../middlewears/isAdmin");
const { getAllTasks } = require("../controlers/administrator/getAllTasks");
const {
  deleteAdminTask,
} = require("../controlers/administrator/deleteAdminTask");
const {
  updateAdminTask,
} = require("../controlers/administrator/updateAdminTask");
const router = express.Router();

router.get("/get-all", isUserAuthenticated, isAdmin, getAllTasks);
router.delete(
  "/delete-task/:taskId",
  isUserAuthenticated,
  isAdmin,
  deleteAdminTask
);

router.patch("/update-task/:id", isUserAuthenticated, isAdmin, updateAdminTask);

module.exports = router;
