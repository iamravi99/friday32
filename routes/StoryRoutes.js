const express = require("express");
const router = express.Router();
const {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory
} = require("../controllers/StoryController");

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

module.exports = router;
