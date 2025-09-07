const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "IT", "ECE", "EE", "ME", "CE"],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@rkgit\.edu\.in$/, "Must be a valid RKGIT email"],
    },
    personalEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
