const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validationOldUser } = require("../../models/user");

//create new token
const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id: _id, Admin: isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const loginAdmin = async (req, res) => {
  const { error } = validationOldUser.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found!" });
    }

    const existPassword = await bcrypt.compare(password, user.password);
    if (!existPassword) {
      return res.status(400).json({ message: "Incorrect passwrod!" });
    }
    if (user.isAdmin === false) {
      return res.status(400).json("Access Denied!");
    }
    const token = createToken(user._id, user.isAdmin);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(404).json({ mesage: error.message });
  }
};

module.exports = { loginAdmin };
