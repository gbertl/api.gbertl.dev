const mongoose = require('mongoose');

const screenshotSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  priorityOrder: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Screenshot', screenshotSchema);
