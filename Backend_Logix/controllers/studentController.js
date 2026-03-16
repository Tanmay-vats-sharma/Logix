const Team = require("../models/TeamModel"); // Single schema
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const Registration = require("../models/Registration");

exports.registerTeam = async (req, res) => {
  try {
    const {
      teamName,
      leaderName,
      leaderRollNumber,
      leaderBranch,
      leaderSection,
      leaderPhoneNumber,
      leaderPersonalEmail,
      teamMembers,
      password,
    } = req.body;

    // --- Basic Validation ---
    if (
      !leaderName ||
      !leaderRollNumber ||
      !leaderBranch ||
      !leaderSection ||
      !leaderPhoneNumber ||
      !leaderPersonalEmail ||
      !password
    ) {
      return res.status(400).json({ message: "All leader details are required" });
    }
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
    const personalEmails = allMembers.map((m) => m.personalEmail);
    const phoneNumbers = allMembers.map((m) => m.phoneNumber);

    if (new Set(rollNumbers).size !== rollNumbers.length) {
      return res
        .status(400)
        .json({ message: "Duplicate roll numbers found in the team" });
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
    // const existingTeam = await Team.findOne({
    //   $or: [
    //     { "leader.rollNumber": { $in: rollNumbers } },
    //     { "leader.collegeEmail": { $in: collegeEmails } },
    //     { "leader.personalEmail": { $in: personalEmails } },
    //     { "leader.phoneNumber": { $in: phoneNumbers } },
    //     { "members.rollNumber": { $in: rollNumbers } },
    //     { "members.collegeEmail": { $in: collegeEmails } },
    //     { "members.personalEmail": { $in: personalEmails } },
    //     { "members.phoneNumber": { $in: phoneNumbers } },
    //   ],
    // });

    // if (existingTeam) {
    //   return res.status(400).json({
    //     message: "One or more members are already registered in another team",
    //   });
    // }

    const latestEvent = await Event.findOne().sort({ createdAt: -1 }).lean();

    const existingTeam = await Team.findOne({
      teamName,
      event: latestEvent._id,
    });

    if (existingTeam) {
      return res
        .status(400)
        .json({ message: "Team name already taken" });
    }

    // --- Save team ---
    const team = await Team.create({
      teamName,
      leader,
      members: teamMembers || [],
      password,
      event: latestEvent._id,
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
      { id: team._id, teamName: team.teamName, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set token in cookies
    res.cookie('token', token, { 
      httpOnly: true, 
      secure : process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send success response
    return res.status(200).json({
      message: "Login successful",
      team,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Register an individual student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      branch,
      section,
      phoneNumber,
      collegeEmail,
      personalEmail,
      participantType,
      agreeTerms,
      eventId,
    } = req.body;

    if (!name || !rollNumber || !branch || !phoneNumber || !personalEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check duplicates in registrations
    const existingRegistration = await Registration.findOne({
      $or: [
        { rollNumber },
        { personalEmail },
        { phoneNumber },
      ],
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Check if this student is already part of a team
    const existingInTeam = await Team.findOne({
      $or: [
        { "leader.rollNumber": rollNumber },
        { "leader.personalEmail": personalEmail },
        { "leader.phoneNumber": phoneNumber },
        { "members.rollNumber": rollNumber },
        { "members.personalEmail": personalEmail },
        { "members.phoneNumber": phoneNumber },
      ],
    });

    if (existingInTeam) {
      return res.status(400).json({ message: "Student already registered in a team" });
    }

    // Determine event
    let event = null;
    if (eventId) event = eventId;
    else {
      const latestEvent = await Event.findOne().sort({ createdAt: -1 }).lean();
      if (latestEvent) event = latestEvent._id;
    }

    const registration = await Registration.create({
      name,
      rollNumber,
      branch,
      section,
      phoneNumber,
      collegeEmail,
      personalEmail,
      participantType: participantType || "individual",
      agreeTerms: !!agreeTerms,
      event,
    });

    return res.status(201).json({ message: "Registration successful", registration });
  } catch (error) {
    console.error("Student Registration Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login for individual student
exports.loginStudent = async (req, res) => {
  try {
    const { rollNumber, personalEmail } = req.body;

    if (!rollNumber) {
      return res.status(400).json({ message: "Roll number is required" });
    }

    const registration = await Registration.findOne({ rollNumber });
    if (!registration) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (personalEmail && registration.personalEmail !== personalEmail) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: registration._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", registration });
  } catch (error) {
    console.error("Student Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};