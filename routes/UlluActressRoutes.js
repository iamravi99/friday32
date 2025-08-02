const express = require('express');
const router = express.Router();
const {
  getAllActresses,
  getActressById,
  createActress,
  updateActress,
  deleteActress
} = require('../controllers/UlluActressController');

router.get('/', getAllActresses);
router.get('/:id', getActressById);
router.post('/', createActress);
router.put('/:id', updateActress);
router.delete('/:id', deleteActress);

module.exports = router;
