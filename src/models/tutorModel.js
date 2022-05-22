const mongoose = require('mongoose');
const tutorSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        lastname:{
            type: String,
            required:true
        },
        lastname:{
            type: String,
            required:true
        },
        profile_picture:{
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        fee: {
            type:Number,
            required:true
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tutor', tutorSchema, 'tutors');