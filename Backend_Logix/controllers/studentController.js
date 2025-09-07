const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      branch,
      phoneNumber,
      collegeEmail,
      personalEmail,
      password,
    } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ collegeEmail }, { personalEmail }, { rollNumber }],
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "User already exists with this email or roll number" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save student
    const student = await Student.create({
      name,
      rollNumber,
      branch,
      phoneNumber,
      collegeEmail,
      personalEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      student: {
        id: student._id,
        name: student.name,
        collegeEmail: student.collegeEmail,
        personalEmail: student.personalEmail,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student using college or personal email
    const student = await Student.findOne({
      $or: [{ collegeEmail: email }, { personalEmail: email }],
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        student: {
          id: student._id,
          name: student.name,
          collegeEmail: student.collegeEmail,
          personalEmail: student.personalEmail,
        },
        token,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
