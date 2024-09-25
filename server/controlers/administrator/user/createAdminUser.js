const { validationNewUser, User } = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id: _id, Admin: isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const createAdminUser = async (req, res) => {
  const { error } = validationNewUser.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { firstName, lastName, birthday, email, password, gender, isAdmin } =
    req.body;

  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json("Email already in use!");
  }

  const hashPassword = await bcrypt.hash(password, 12);
  req.body.password = hashPassword;

  const token = createToken(req.body._id, isAdmin);
  try {
    const user = await User.create(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { createAdminUser };
