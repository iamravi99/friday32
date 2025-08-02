const express = require("express");
const router = express.Router();

const {
  getAllWebseries,
  createWebseries,
  getWebseriesById,
  updateWebseries,
  deleteWebseries
} = require("../controllers/WebseriesController");

router.get("/", getAllWebseries);
router.post("/", createWebseries);
router.get("/:id", getWebseriesById);
router.put("/:id", updateWebseries);
router.delete("/:id", deleteWebseries);

module.exports = router;
