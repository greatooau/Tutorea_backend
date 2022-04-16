const express = require('express');
const router = express.Router();
const { getUser, registerUser, deleteUser } = require('../controllers/userController');

router.route('/').post(registerUser);

router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;