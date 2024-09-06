const { validationNewUser, User } = require("../models/user");
const jwt = require("jsonwebtoken");
const generateToken = require("../utilities/generateToken");

const signupUser = async (req, res) => {
  const { error } = validationNewUser.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await User.signupUser(req.body);
    if (!user) {
      return res.status(400).json({ message: user.error });
    }
    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser };
