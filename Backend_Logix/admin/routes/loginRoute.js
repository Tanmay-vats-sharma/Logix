const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// POST /login
router.post('/admin-login', loginController.login);

module.exports = router;