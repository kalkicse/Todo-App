const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const t = new Task({ ...req.body, user: req.user.id });
  await t.save();
  res.json(t);
});

router.put("/:id", auth, async (req, res) => {
  const t = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!t) return res.status(404).json({ error: "Not found" });
  Object.assign(t, req.body);
  await t.save();
  res.json(t);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ success: true });
});

module.exports = router;
