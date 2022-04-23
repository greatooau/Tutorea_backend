const mongoose = require('mongoose');
const studiesSchema = mongoose.Schema(
    {
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