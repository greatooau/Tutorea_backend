const mongoose = require('mongoose');
const tutorSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
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