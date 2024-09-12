const Tasks = require("../../models/tasks");

const getAllTasks = async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json(tasks);
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllTasks };
