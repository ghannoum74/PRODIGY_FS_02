const Tasks = require("../../models/tasks");

const createTask = async (req, res) => {
  const { title, description, status, dueDate, type } = req.body;

  if (!title || !description || !dueDate || !type) {
    return res.status(400).json({ message: "All data must be filled!" });
  }

  try {
    const existingTask = await Tasks.findOne({ title, user: req.user._id });

    if (existingTask) {
      return res.status(400).json({
        message: "Task with this title already exists for this user!",
      });
    }

    dueDateIsNotAvailabel = await Tasks.findOne({
      dueDate,
      user: req.user._id,
    });
    if (dueDateIsNotAvailabel) {
      return res.status(400).json({
        message:
          "Your have already an appointement in this time ,  please add another one",
      });
    }

    const task = await Tasks.create({
      title,
      description,
      status,
      dueDate,
      type,
      user: req.user._id,
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask };
