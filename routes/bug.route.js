const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middlewares/auth.middleware');
const { createBugValidator } = require('../middlewares/bug.middleware');
const validate = require("../middlewares/validate.middleware");
const {
  getBugs,
  createBug,
  getBug,
  updateBug,
  deleteBug,
  getBugStats
} = require('../controllers/bug.controller');

router.route('/')
  .get(protect, getBugs)
  .post(protect, validate(createBugValidator), createBug);

router.route('/stats')
  .get(protect, getBugStats);

router.route('/:id')
  .get(protect, getBug)
  .put(protect, updateBug)
  .delete(protect, deleteBug);

module.exports = router;