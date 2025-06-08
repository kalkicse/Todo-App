require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport"); // configure Google Strategy
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors(), express.json(), passport.initialize());

mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
