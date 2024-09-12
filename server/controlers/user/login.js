const { User, validationOldUser } = require("../../models/user");
const jwt = require("jsonwebtoken");
//create new token
const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id: _id, isAdmin: isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const loginUser = async (req, res) => {
  const { error } = validationOldUser.validate(req.body);
  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id, user.isAdmin);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser };
