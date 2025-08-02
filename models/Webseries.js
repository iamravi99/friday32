const mongoose = require("mongoose");

const WebseriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  images: [{
    url: String,
    position: { type: String, enum: ['top', 'middle', 'bottom', 'left', 'right'], default: 'top' },
    caption: String
  }],
  rating: { type: Number, min: 1, max: 10 },
  category: String,
  platform: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Webseries", WebseriesSchema);
