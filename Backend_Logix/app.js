// app.js
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Debug: ensure env loaded
console.log("✅ ABLY_API_KEY loaded:", !!process.env.ABLY_API_KEY);

const app = express();

// Rate limiter middleware
// const rateLimitHandler = (req, res, next, options) => {
//   console.log(`Rate limit exceeded for IP: ${req.ip}`);
//   res.status(options.statusCode).send(options.message);
// };
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: "Too many requests from this IP, please try again later.",
//   handler: rateLimitHandler,
// });

app.set("trust proxy", 1);

// Database connection
connectDB();

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(":remote-addr :method :url :status :response-time ms - :res[content-length] bytes"));
// app.use(limiter);

// Routes
const studentRoutes = require("./routes/studentRoute");
const adminRouter = require("./admin/router");
const ablyRoutes = require("./routes/ablyRoute");
const submissionRoute = require("./routes/submissionRoute");

app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/ably", ablyRoutes);
app.use("/api/submission", submissionRoute);

// Root
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
