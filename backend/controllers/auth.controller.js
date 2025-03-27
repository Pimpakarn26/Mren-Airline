const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

// ลงทะเบียนผู้ใช้ใหม่ (signup)
exports.signup = async (req, res) => {
  const { fullNameTH, fullNameEN, email, phone, password } = req.body;

  if (!fullNameTH || !fullNameEN || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullNameTH,
      fullNameEN,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred during registration",
      error: error.message,
    });
  }
};

// เข้าสู่ระบบ (signin)
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email }); // เปลี่ยนเป็น UserModel
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      // ใช้ JWT_SECRET จาก env
      expiresIn: "1h",
    });

    // ตั้งค่า cookie สำหรับ JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ตั้งค่าการใช้ secure cookie ใน production
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// เพิ่มผู้ใช้ใหม่
exports.addUser = async (req, res) => {
  const { fullNameTH, fullNameEN, email, phone, password, role } = req.body;

  if (!email || !fullNameTH || !fullNameEN || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullNameTH,
      fullNameEN,
      email,
      phone,
      password: hashedPassword,
      role: role || "user", // ใช้ role จาก body หรือ default เป็น "user"
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", newUser });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while adding a new user",
      error: error.message,
    });
  }
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullNameTH, fullNameEN, email, phone, role } = req.body;

  if (!fullNameTH || !fullNameEN || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { fullNameTH, fullNameEN, email, phone, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating user",
      error: error.message,
    });
  }
};

// ลบผู้ใช้
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while deleting user",
      error: error.message,
    });
  }
};
