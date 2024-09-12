const Tasks = require("../../models/tasks");

const getUserTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    res.status(200).json([{ tasks }]);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { getUserTasks };
