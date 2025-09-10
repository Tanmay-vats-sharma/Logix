const Event = require('../../models/Event');
const Round = require('../../models/Rounds');

// Controller to get all rounds of the latest event
exports.getAllRounds = async (req, res) => {
  try {
    // Find the latest event (assuming createdAt field exists)
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });

    if (!latestEvent) {
      return res.status(404).json({ message: 'No events found.' });
    }

    // Find all rounds for the latest event
    const rounds = await Round.find({ event: latestEvent._id });

    res.status(200).json(rounds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createRound = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }

    // Find the latest event (assuming createdAt field exists)
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });
    if (!latestEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const newRound = new Round({
      name,
      description,
      event: latestEvent._id
    });

    const savedRound = await newRound.save();
    res.status(201).json(savedRound);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addQuestionToRound = async (req, res) => {
  try {
    const { roundId } = req.params;
    const { questionText, description } = req.body;

    // Validate required fields
    if (!questionText || !description) {
      return res.status(400).json({ message: 'Question text and description are required.' });
    }

    // Find the round by ID
    const round = await Round.findById(roundId);
    if (!round) {
      return res.status(404).json({ message: 'Round not found.' });
    }

    // Create the question object
    const question = {
      description,
      text: questionText
    };

    // Add the question to the round's questions array
    if (!round.questions) {
      round.questions = [];
    }
    round.questions.push(question);

    // Save the updated round
    await round.save();

    res.status(201).json({ message: 'Question added to round successfully.', question });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};