const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const Transactions = require('../models/transactionModel')
const asyncHandler = require("express-async-handler");

router.route('/')
    .post(protect, asyncHandler(async (req, res) => {
        
        await Transactions.create(req.body)
        res.json({...req.body})
        res.status(200)
        res.end()
    }))
module.exports = router