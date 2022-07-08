const express = require('express');
const router = express.Router();
const { getTutors, getTutor, getTutorsByCategory, loginTutor, getMyStudents, getMe, changePassword, preregister } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTutors);

router.route('/me')
    .get(protect, getMe);

router.route('/students')
.get(protect, getMyStudents);

//Login del tutor
router.route('/login')
    .post(loginTutor);

router.route('/password')
    .post(protect, changePassword);


router.route('/pre-register')
    .post(preregister);    
    
router.route('/:id')
    .get(protect, getTutor);

router.route('/category/:category')
    .get(protect, getTutorsByCategory);




module.exports = router;