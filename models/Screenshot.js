const mongoose = require('mongoose');

const screenshotSchema = new mongoose.Schema({
  image: String,
  priorityOrder: Number,
});

module.exports = mongoose.model('Screenshot', screenshotSchema);
