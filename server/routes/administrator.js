const express = require("express");
const { isUserAuthenticated } = require("../middlewears/isUserAuthenticated");
const { isAdmin } = require("../middlewears/isAdmin");

const { loginAdmin } = require("../controlers/administrator/login");

const {
  deleteAdminTask,
} = require("../controlers/administrator/tasks/deleteAdminTask");
const {
  updateAdminTask,
} = require("../controlers/administrator/tasks/updateAdminTask");
const { getAllData } = require("../controlers/administrator/getAllData");
const {
  deleteAdminUser,
} = require("../controlers/administrator/user/deleteAdminUser");
const {
  updateAdminUser,
} = require("../controlers/administrator/user/updateAdminUser");
const {
  createAdminUser,
} = require("../controlers/administrator/user/createAdminUser");
const {
  createAdminTask,
} = require("../controlers/administrator/tasks/createAdminTask");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/get-all", isUserAuthenticated, isAdmin, getAllData);

router.post(
  "/tasks/create-task",
  isUserAuthenticated,
  isAdmin,
  createAdminTask
);
router.delete(
  "/tasks/delete-task/:taskId",
  isUserAuthenticated,
  isAdmin,
  deleteAdminTask
);

router.patch(
  "/tasks/update-task/:id",
  isUserAuthenticated,
  isAdmin,
  updateAdminTask
);

router.post(
  "/users/create-user",
  isUserAuthenticated,
  isAdmin,
  createAdminUser
);

router.patch(
  "/users/update-user/:userId",
  isUserAuthenticated,
  isAdmin,
  updateAdminUser
);

router.delete(
  "/users/delete-user/:userId",
  isUserAuthenticated,
  isAdmin,
  deleteAdminUser
);

module.exports = router;
