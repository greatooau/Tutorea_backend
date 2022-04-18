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
            required: [true, 'Please add a text value']
        },
        stars: {
            type: Number,
            required: [true, 'Please add a text value']
        },
        studies: {
            type: mongoose.Schema.Types.Objec
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Goal', goalSchema);