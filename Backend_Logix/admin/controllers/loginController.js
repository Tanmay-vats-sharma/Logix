const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Directly compare plain-text passwords
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7h' }
    );

    // Set token in cookies
    res.cookie('token', token, { httpOnly: true, maxAge: 25200000 });

    res.json({
      message: 'Login successful',
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
