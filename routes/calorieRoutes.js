const express = require('express');
const { getCalories } = require('../controllers/calorieController.js');
const protect = require('../middlewares/authMiddleware.js');
const { sendFeedback } = require('../controllers/feedbackController.js');
const router = express.Router();

router.post('/get-calories', protect, getCalories);
router.post('/submit-feedback', protect, sendFeedback);

module.exports = router;
