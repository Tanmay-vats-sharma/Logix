// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const morgan = require("morgan");

dotenv.config();
const app = express();

// Database connection
connectDB();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL.split(',') || ['http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const studentRoutes = require("./routes/studentRoute");
const adminLoginRoutes = require("./admin/routes/loginRoute");
const adminTeamRoutes = require("./admin/routes/teamRoute");
const adminEventRoutes = require("./admin/routes/eventRoute");
const adminStudentRoutes = require("./admin/routes/studentRoute");
const adminRoundRoutes = require("./admin/routes/roundRoute");

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin/login", adminLoginRoutes);
app.use("/api/admin/events", adminEventRoutes);
app.use("/api/admin/teams", adminTeamRoutes);
app.use("/api/admin/students", adminStudentRoutes);
app.use("/api/admin/rounds", adminRoundRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
