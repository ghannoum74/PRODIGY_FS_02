const Tasks = require("../../models/tasks");

const updateAdminTask = async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;
  if (!taskId || !updateData) {
    return res
      .status(400)
      .json({ message: "Task ID and update data are required" });
  }

  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: taskId },
      { $set: updateData },
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

module.exports = { updateAdminTask };
