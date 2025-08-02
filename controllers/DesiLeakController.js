const DesiLeak = require("../models/DesiLeak");

// Get all leaks
exports.getAllLeaks = async (req, res) => {
  try {
    const leaks = await DesiLeak.find().sort({ createdAt: -1 });
    res.json(leaks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single leak
exports.getLeakById = async (req, res) => {
  try {
    const leak = await DesiLeak.findById(req.params.id);
    if (!leak) return res.status(404).json({ message: "Leak not found" });
    res.json(leak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a leak
exports.createLeak = async (req, res) => {
  try {
    const newLeak = new DesiLeak(req.body);
    await newLeak.save();
    res.status(201).json(newLeak);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a leak
exports.updateLeak = async (req, res) => {
  try {
    const updatedLeak = await DesiLeak.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLeak) return res.status(404).json({ message: "Leak not found" });
    res.json(updatedLeak);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a leak
exports.deleteLeak = async (req, res) => {
  try {
    const deletedLeak = await DesiLeak.findByIdAndDelete(req.params.id);
    if (!deletedLeak) return res.status(404).json({ message: "Leak not found" });
    res.json({ message: "Leak deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
