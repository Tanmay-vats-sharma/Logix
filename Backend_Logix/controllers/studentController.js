const bcrypt = require("bcryptjs");
const Team = require("../models/teamModel"); // Single schema
const jwt = require("jsonwebtoken");
exports.registerTeam = async (req, res) => {
  try {
    const {
      teamName,
      leaderName,
      leaderRollNumber,
      leaderBranch,
      leaderSection,
      leaderPhoneNumber,
      leaderCollegeEmail,
      leaderPersonalEmail,
      teamMembers,
      password,
    } = req.body;

    // --- Basic Validation ---
    if (!teamName) {
      return res.status(400).json({ message: "Team name is required" });
    }

    // Leader data
    const leader = {
      name: leaderName,
      rollNumber: leaderRollNumber,
      branch: leaderBranch,
      section: leaderSection,
      phoneNumber: leaderPhoneNumber,
      collegeEmail: leaderCollegeEmail,
      personalEmail: leaderPersonalEmail,
    };

    // Prepare all members (leader + teamMembers)
    const allMembers = [leader, ...(teamMembers || [])];

    // Restrict team size to max 3 members
    if (allMembers.length > 3) {
      return res
        .status(400)
        .json({ message: "A team can have at most 3 members" });
    }

    // --- Check for duplicate data inside submitted team ---
    const rollNumbers = allMembers.map((m) => m.rollNumber);
    const collegeEmails = allMembers.map((m) => m.collegeEmail);
    const personalEmails = allMembers.map((m) => m.personalEmail);
    const phoneNumbers = allMembers.map((m) => m.phoneNumber);

    if (new Set(rollNumbers).size !== rollNumbers.length) {
      return res
        .status(400)
        .json({ message: "Duplicate roll numbers found in the team" });
    }
    if (new Set(collegeEmails).size !== collegeEmails.length) {
      return res
        .status(400)
        .json({ message: "Duplicate college emails found in the team" });
    }
    if (new Set(personalEmails).size !== personalEmails.length) {
      return res
        .status(400)
        .json({ message: "Duplicate personal emails found in the team" });
    }
    if (new Set(phoneNumbers).size !== phoneNumbers.length) {
      return res
        .status(400)
        .json({ message: "Duplicate phone numbers found in the team" });
    }

    // --- Check if any member already exists in another team ---
    const existingTeam = await Team.findOne({
      $or: [
        { "leader.rollNumber": { $in: rollNumbers } },
        { "leader.collegeEmail": { $in: collegeEmails } },
        { "leader.personalEmail": { $in: personalEmails } },
        { "leader.phoneNumber": { $in: phoneNumbers } },
        { "members.rollNumber": { $in: rollNumbers } },
        { "members.collegeEmail": { $in: collegeEmails } },
        { "members.personalEmail": { $in: personalEmails } },
        { "members.phoneNumber": { $in: phoneNumbers } },
      ],
    });

    if (existingTeam) {
      return res.status(400).json({
        message: "One or more members are already registered in another team",
      });
    }

    // --- Hash password (leader's roll number) ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- Save team ---
    const team = await Team.create({
      teamName,
      leader,
      members: teamMembers || [],
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Team registration successful",
      team: {
        id: team._id,
        teamName: team.teamName,
        leader: team.leader,
        members: team.members,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginTeam = async (req, res) => {
  try {
    const { teamName, leaderRollNumber } = req.body;

    // Validation
    if (!teamName || !leaderRollNumber) {
      return res
        .status(400)
        .json({ message: "Team name and leader roll number are required" });
    }

    // Find team by teamName
    const team = await Team.findOne({ teamName });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Validate leader roll number (since it's the password)
    if (team.leader.rollNumber !== leaderRollNumber) {
      return res.status(401).json({ message: "Invalid roll number" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: team._id, teamName: team.teamName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // can't be accessed via JS
      secure: process.env.NODE_ENV === "production", // secure in production
      sameSite: "strict", // prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      team: {
        id: team._id,
        teamName: team.teamName,
        leader: team.leader,
        members: team.members,
      },
      token, // also sending token in response (optional)
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};