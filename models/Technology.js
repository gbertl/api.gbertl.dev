const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Technology', technologySchema);
