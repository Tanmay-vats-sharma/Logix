const jwt = require("jsonwebtoken");

// Authentication Middleware: checks token in cookies
function auth(req, res, next) {
  const token = req.cookies && req.cookies.token;

  console.log("Auth Middleware - Token:", req.cookies); // Debugging line
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// Role Checking Middleware
function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }
    next();
  };
}

module.exports = { auth, checkRole };
