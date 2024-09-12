const Tasks = require("../../models/tasks");

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Ensure the task belongs to the authenticated user
    const task = await Tasks.findOneAndDelete({
      _id: taskId,
      user: req.user._id,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
};

module.exports = { deleteTask };
