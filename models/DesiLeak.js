const mongoose = require("mongoose");

const desiLeakSchema = new mongoose.Schema({
  title: {
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
  },
  content: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("DesiLeak", desiLeakSchema);
