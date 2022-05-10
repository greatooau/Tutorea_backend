const mongoose = require('mongoose');
const payDataSchema = mongoose.Schema(
    {
        user:{
            type:String,
            required:true,
            ref:'User'
        },
        cardNumber: {
            type: String,
            required:true
        },
        CVV: {
            type: String,
            required:true
        },
        expDate: {
            type: String,
            required:true
        },
        titularName: {
            type: String,
            required:true
        },
        cardType: {
            type: String,
            required:true
        },
        cardAdress: {
            type: String,
            required:true
        },
        cardPostalCode: {
            type: String,
            required:true
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PayData', payDataSchema, 'payData');