const express = require("express");
const router = express.Router();
const {
  getAllLeaks,
  getLeakById,
  createLeak,
  updateLeak,
  deleteLeak
} = require("../controllers/DesiLeakController");

router.get("/", getAllLeaks);
router.get("/:id", getLeakById);
router.post("/", createLeak);
router.put("/:id", updateLeak);
router.delete("/:id", deleteLeak);

module.exports = router;
