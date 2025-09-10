const Event = require('../../models/Event');

// Create Event Controller
exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    // Basic validation
    if (!name || !date || !location) {
      return res.status(400).json({ message: 'Name, date, and location are required.' });
    }

    const event = new Event({
      name,
      date,
      location,
      description
    });

    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};