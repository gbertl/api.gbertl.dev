const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  name: String,
  priorityOrder: Number,
});

module.exports = mongoose.model('Category', categorySchema);
