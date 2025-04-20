const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userFeedback: { type: String, required: true },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);