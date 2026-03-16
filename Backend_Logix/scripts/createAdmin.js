// Script: createAdmin.js
// Usage: node scripts/createAdmin.js (run from Backend_Logix folder)

require("dotenv").config();
const connectDB = require("../config/db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

async function run() {
  await connectDB();

  try {
    const email = "logix@rkgit.edu.in";
    const plainPassword = "admin@123";
    const username = "logix";
    const role = "admin";

    const hashed = await bcrypt.hash(plainPassword, 10);

    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.username = username;
      admin.password = hashed;
      admin.role = role;
      await admin.save();
      console.log("✅ Admin updated:", email);
    } else {
      admin = new Admin({ username, password: hashed, email, role });
      await admin.save();
      console.log("✅ Admin created:", email);
    }
  } catch (err) {
    console.error("❌ Failed to create/update admin:", err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

run();
