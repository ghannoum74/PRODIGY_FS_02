const mongoose = require("mongoose");
const Tasks = require("../../../models/tasks");

const createAdminTask = async (req, res) => {
  const { title, description, status, dueDate, type, id } = req.body;

  if (!title || !description || !dueDate || !type || !id) {
    return res.status(400).json({ message: "All data must be filled!" });
  }

  try {
    const userId = new mongoose.Types.ObjectId(id);
    const existingTask = await Tasks.findOne({ title, user: userId });

    if (existingTask) {
      return res.status(400).json({
        message: "Task with this title already exists for this user!",
      });
    }

    dueDateIsNotAvailabel = await Tasks.findOne({
      dueDate,
      user: userId,
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
      user: userId,
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAdminTask };
