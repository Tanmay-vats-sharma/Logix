// Script: createEvent.js
// Usage: node scripts/createEvent.js "Event Name" "YYYY-MM-DD" "Location" "Optional description"

require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Event = require('../models/Event');

async function run() {
  await connectDB();

  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('Usage: node scripts/createEvent.js "Event Name" "YYYY-MM-DD" "Location" "Optional description"');
    process.exit(1);
  }

  const [name, dateStr, location, description] = args;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.error('Invalid date. Use YYYY-MM-DD');
    process.exit(1);
  }

  try {
    const existing = await Event.findOne({ name, date });
    if (existing) {
      console.log('Event already exists:', existing._id.toString());
      process.exit(0);
    }

    const ev = new Event({ name, date, location, description });
    await ev.save();
    console.log('✅ Event created:', ev._id.toString());
    console.log('  name:', ev.name);
    console.log('  date:', ev.date.toISOString());
    console.log('  location:', ev.location);
  } catch (err) {
    console.error('❌ Failed to create event:', err.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

run();
