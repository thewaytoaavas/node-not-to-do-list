import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 3,
    },
    hr: {
      type: Number,
      required: true,
      default: 0,
    },
    taskType: {
      type: String,
      default: "taskList", //taskList \\ badList
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema);
