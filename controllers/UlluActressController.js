const UlluActress = require('../models/UlluActress');

// GET all actresses
exports.getAllActresses = async (req, res) => {
  try {
    const actresses = await UlluActress.find().sort({ createdAt: -1 });
    res.json(actresses);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET single actress by ID
exports.getActressById = async (req, res) => {
  try {
    const actress = await UlluActress.findById(req.params.id);
    if (!actress) return res.status(404).json({ error: 'Not Found' });
    res.json(actress);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.createActress = async (req, res) => {
  try {
    const newActress = new UlluActress(req.body);
    const saved = await newActress.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Data' });
  }
};

exports.updateActress = async (req, res) => {
  try {
    const updated = await UlluActress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not Found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteActress = async (req, res) => {
  try {
    const deleted = await UlluActress.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
