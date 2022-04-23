const mongoose = require('mongoose');
const studiesSchema = mongoose.Schema(
    {
        tutor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Tutor'
        },
        study: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        school: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        img: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        
    },
    {
        timestamps: true
    },
);

module.exports = mongoose.model('Studies', studiesSchema, 'studies');