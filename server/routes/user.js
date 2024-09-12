const express = require("express");
const { isUserAuthenticated } = require("../middlewears/isUserAuthenticated");
const { signupUser } = require("../controlers/user/signup");
const { loginUser } = require("../controlers/user/login");
const { getUserById } = require("../controlers/user/getUserById");
const { updateUser } = require("../controlers/user/update");
const router = express.Router();

router.post("/signup", signupUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.patch("/update/:id", isUserAuthenticated, updateUser);
// router.post("/oauth", oauthentication);

module.exports = router;
