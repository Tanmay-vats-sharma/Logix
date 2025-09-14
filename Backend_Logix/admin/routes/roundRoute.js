const express = require('express');
const roundController = require('../controllers/roundController');
const { checkRole } = require('../../middlewares/auth');

const router = express.Router();

// GET /rounds - Get all rounds
router.use(checkRole(['superadmin']));
router.get('/', roundController.getAllRounds);
router.post('/', roundController.createRound);
router.post('/:roundId', roundController.addQuestionToRound);

module.exports = router;