const express = require('express');
const router = express.Router();
const { getTutors, getTutor, getTutorsByCategory, loginTutor } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTutors);

//Login del tutor
router.route('/login')
    .post(loginTutor);

router.route('/:id')
    .get(protect, getTutor);

router.route('/category/:category')
    .get(protect, getTutorsByCategory)


module.exports = router;