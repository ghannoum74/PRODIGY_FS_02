const Tasks = require("../../models/tasks");

const updateTask = async (req, res) => {
  const data = req.body;

  if (!data.taskId) {
    return res
      .status(400)
      .json({ message: "Task ID and update data are required" });
  }
  const sameDate = await Tasks.findOne({
    dueDate: data.dueDate,
    user: req.user._id,
  });

  if (sameDate) {
    return res.status(400).json({ message: "this time is not availbale!" });
  }

  const sameTitle = await Tasks.findOne({
    title: data.title,
    user: req.user._id,
  });

  if (sameTitle) {
    return res
      .status(400)
      .json({ message: "you have already this task title" });
  }

  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: data.taskId, user: req.user._id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateTask };
