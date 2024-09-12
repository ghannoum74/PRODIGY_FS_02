const { User } = require("../../models/user");

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  res.status(200).json(user);
};

module.exports = { getUserById };
