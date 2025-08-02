const express = require("express");
const router = express.Router();
const {
  getAllViral,
  getViralById,
  createViral,
  updateViral,
  deleteViral
} = require("../controllers/ViralController");

router.get("/", getAllViral);
router.get("/:id", getViralById);
router.post("/", createViral);
router.put("/:id", updateViral);
router.delete("/:id", deleteViral);

module.exports = router;
