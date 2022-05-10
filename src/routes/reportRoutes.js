const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const asyncHandler = require('express-async-handler');

const Reports = require('../models/reportModel');

router.route('/')
    .post(protect, asyncHandler(async (req, res) => {
        console.log('testeando ruta')
        const user = req.user.id
        const report = req.body.report
        const tutor = req.body.tutorId
        const newReport = {
            user,
            tutor,
            report
        } 
        await Reports.create(newReport)
        
        res.status(200)
        res.json(newReport)
        res.end()
    }))
module.exports = router