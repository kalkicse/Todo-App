const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  provider: String,
  providerId: String,
  name: String,
  email: String,
  avatar: String
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);
