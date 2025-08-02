const Webseries = require("../models/Webseries");

exports.getAllWebseries = async (req, res) => {
  try {
    const all = await Webseries.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err.message });
  }
};

exports.createWebseries = async (req, res) => {
  try {
    const newOne = new Webseries(req.body);
    await newOne.save();
    res.status(201).json(newOne);
  } catch (err) {
    res.status(400).json({ message: "Error creating item", error: err.message });
  }
};

exports.getWebseriesById = async (req, res) => {
  try {
    const item = await Webseries.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.updateWebseries = async (req, res) => {
  try {
    const updated = await Webseries.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating item", error: err.message });
  }
};

exports.deleteWebseries = async (req, res) => {
  try {
    const deleted = await Webseries.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};
