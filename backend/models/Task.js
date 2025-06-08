const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, enum: ["Open", "Complete"], default: "Open" }
}, { timestamps: true });
module.exports = mongoose.model("Task", TaskSchema);
