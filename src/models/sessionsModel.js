const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required:true
        },
        tutor: {
            type: mongoose.Types.ObjectId,
            required:true,
            ref:'Tutor'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Sessions', sessionSchema, 'sessions');