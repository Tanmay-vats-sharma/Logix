const express = require('express');
const roundController = require('../controllers/roundController');

const router = express.Router();

// GET /rounds - Get all rounds
router.get('/', roundController.getAllRounds);
router.post('/', roundController.createRound);
router.post('/:roundId', roundController.addQuestionToRound);

module.exports = router;