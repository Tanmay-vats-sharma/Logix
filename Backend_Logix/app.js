// app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

dotenv.config();


// Rate limiter middleware
const rateLimitHandler = (req, res, next, options) => {
  console.log(`Rate limit exceeded for IP: ${req.ip}`);
  res.status(options.statusCode).send(options.message);
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
  handler: rateLimitHandler,
});

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
app.use(morgan(':remote-addr :method :url :status :response-time ms - :res[content-length] bytes'));
app.use(limiter);

const studentRoutes = require("./routes/studentRoute");
const adminRouter = require("./admin/router");

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRouter);


app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
