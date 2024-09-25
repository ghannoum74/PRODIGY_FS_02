const Tasks = require("../../models/tasks");
const { User } = require("../../models/user");

const getAllData = async (req, res) => {
  const tasks = await Tasks.find({});
  const users = await User.find({});

  res.status(200).json({ tasks: tasks, users: users });
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllData };
