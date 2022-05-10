const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref:'User'
        },
        tutor: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref:'Tutor'
        },
        sesions:{
            type: Number,
            required:true
        },
        total: {
            type: String,
            required:true
        },


    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transactions', transactionSchema, 'transactions');