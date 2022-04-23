const express = require('express');
const router = express.Router();
const { registerUser, getMe, editUser } = require('../controllers/userController');

router.route('/').post(registerUser);

router.route('/:id').get(getMe).put(editUser);

module.exports = router;