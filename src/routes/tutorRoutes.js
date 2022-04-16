const express = require('express');
const router = express.Router();
const { getTutors, registerTutor, getTutor } = require('../controllers/tutorController');

router.route('/').get(getTutors).post(registerTutor);

router.route('/:id').get(getTutor).delete();

module.exports = router;