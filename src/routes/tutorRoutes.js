const express = require('express');
const router = express.Router();
const { getTutors, registerTutor, getTutor } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware')
router.route('/').get(protect, getTutors).post(registerTutor);

router.route('/:id').get(protect, getTutor);

module.exports = router;