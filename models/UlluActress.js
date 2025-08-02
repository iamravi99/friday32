const mongoose = require('mongoose');

const ulluActressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('UlluActress', ulluActressSchema);
