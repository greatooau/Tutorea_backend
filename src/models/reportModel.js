const mongoose = require('mongoose');
const reportSchema = mongoose.Schema(
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
        report: {
            type: String,
            required:true
        },


    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Reports', reportSchema, 'reports');