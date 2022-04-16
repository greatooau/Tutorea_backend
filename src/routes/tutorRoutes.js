const express = require('express');
const router = express.Router();
const { getTutors, registerUser, getTutor } = require('../controllers/tutorController');

router.route('/').get(getTutors).post(registerUser);

router.route('/:id').get(getTutor).delete();

module.exports = router;