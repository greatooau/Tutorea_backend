const express = require('express');
const router = express.Router();
const { getTutors } = require('../controllers/tutorController');

router.route('/').get(getTutors).post();

router.route('/:id').get().delete().post();

module.exports = router;