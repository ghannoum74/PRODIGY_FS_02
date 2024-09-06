const { validationOldUser, User } = require("../models/user");
const generateToken = require("../utilities/generateToken");

const loginUser = async (req, res) => {
  const { error } = validationOldUser.validate(req.body);
  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    //create token
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { loginUser };
