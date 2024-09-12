const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: String,
    type: {
      type: String,
      enum: ["work", "shopping", "personal", "health"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "passed", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
