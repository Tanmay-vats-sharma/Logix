const express = require('express');
const teamController = require('../controllers/teamController');
const { checkRole } = require('../../middlewares/auth');

const router = express.Router();

// Get all teams
router.use(checkRole(['admin','superadmin']));
router.get('/', teamController.getAllTeams);

router.use(checkRole(['superadmin']));
// Add a new team
// router.post('/', teamController.addTeam);

// // Delete a particular team by ID
router.delete('/:id', teamController.deleteTeam);

module.exports = router;