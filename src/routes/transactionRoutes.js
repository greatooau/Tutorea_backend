const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const Transactions = require('../models/transactionModel')
const asyncHandler = require("express-async-handler");
const { route } = require('./tutorRoutes');

router.route('/')
    .post(protect, asyncHandler(async (req, res) => {
        
        await Transactions.create(req.body)
        res.json({...req.body})
        res.status(200)
        res.end()
    }))

    //TODO: IMPLEMENTARLO CUANDO SE LE PIQUE A TERMINAR TUTORIA
router.route('/inactive')
    .post(protect, asyncHandler(
        async (req, res) => {
            try{
                console.log(req.user._id)
                console.log(req.body.tutorId)
                if(!req.user.id || !req.body.tutorId) {
                    throw new Error("Debe incluir ambos ID de tutor y alumno para inactivar la transacción.")
                }
                await Transactions.updateOne({$and: [{ user: req.user._id }, { tutor: req.body.tutorId }, { activo: 1 }]},
                    { activo:0 })
                res.status(200).json('The transaction has been succesfully updated');
                res.end();
            }catch(e){
                res.status(500).json('The operation has failed.');
                res.end();
            }
            
            
        }
    ))
module.exports = router