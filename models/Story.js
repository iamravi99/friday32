const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  images: [{
    url: String,
    position: { type: String, enum: ['top', 'middle', 'bottom', 'left', 'right'], default: 'top' },
    caption: String
  }],
}, { timestamps: true });

module.exports = mongoose.model("Story", storySchema);
