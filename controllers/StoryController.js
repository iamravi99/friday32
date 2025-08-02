const Story = require("../models/Story");

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch story" });
  }
};

exports.createStory = async (req, res) => {
  try {
    const newStory = new Story(req.body);
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ error: "Failed to create story" });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Story not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update story" });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Story not found" });
    res.json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete story" });
  }
};
