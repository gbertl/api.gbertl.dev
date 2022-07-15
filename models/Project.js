const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  livePreview: String,
  sourceCode: String,
  priorityOrder: String,
  technologies: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Technology' }],
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  screenshots: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Screenshot' }],
});

module.exports = mongoose.model('Project', projectSchema);
