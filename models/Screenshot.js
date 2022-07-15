const mongoose = require('mongoose');

const screenshotSchema = new mongoose.Schema({
  image: String,
  priorityOrder: Number,
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
  },
});

module.exports = mongoose.model('Screenshot', screenshotSchema);
