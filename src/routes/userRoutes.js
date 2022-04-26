const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, getMe, editUser, addToMyTutors, loginUser, getMyTutors } = require('../controllers/userController');


router.route('/')
    .post(registerUser);

router.route('/:id')
    .put(protect, editUser);

router.route('/me')
    .get(protect, getMe);

router.route('/mytutors')
    .post(protect, addToMyTutors)
    .get(protect, getMyTutors);


router.route('/login')
    .post(loginUser);

module.exports = router;