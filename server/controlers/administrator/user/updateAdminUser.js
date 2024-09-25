const { User, validationNewUser } = require("../../../models/user");
const bcrypt = require("bcryptjs");

const updateAdminUser = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "user ID and update data are required" });
  }
  // Check if the request body contains a password field
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
  }

  if (req.body.email) {
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json("Email already Exist!");
    }
  }

  try {
    const updateUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res
        .status(404)
        .json({ message: "User not found or unauthorized" });
    }

    res.status(200).json({ user: updateUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateAdminUser };
