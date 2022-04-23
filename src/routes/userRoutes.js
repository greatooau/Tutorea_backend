const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, getMe, editUser, addToMyTutors, loginUser } = require('../controllers/userController');

router.route('/').post(registerUser);

router.route('/:id').get(protect, getMe).put(protect, editUser);

router.route('/tutors').post(protect, addToMyTutors)

router.route('/login').post(loginUser);
module.exports = router;