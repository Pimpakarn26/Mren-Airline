const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new mongoose.Schema({
  fullNameTH: { type: String, required: true },
  fullNameEN: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
