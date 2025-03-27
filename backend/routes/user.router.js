const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");

// Route สำหรับการลงทะเบียน (Signup)
router.post("/signup", userController.signup);

// Route สำหรับการเข้าสู่ระบบ (Signin)
router.post("/signin", userController.signin);

module.exports = router;
