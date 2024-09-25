const Tasks = require("../../../models/tasks");
const { User } = require("../../../models/user");

const deleteAdminUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure the task belongs to the authenticated user

    await Tasks.deleteMany({ user: userId });

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found or not authorized" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

module.exports = { deleteAdminUser };
