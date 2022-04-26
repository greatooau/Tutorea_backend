const express = require('express');
const router = express.Router();
const { getTutors, registerTutor, getTutor, getTutorsByCategory } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTutors).post(registerTutor);

router.route('/:id').get(protect, getTutor);
router.route('/category/:category').get(protect, getTutorsByCategory)


module.exports = router;