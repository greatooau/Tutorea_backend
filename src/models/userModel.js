const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a text value']
        },
        password: {
            type: String,
            required: [true, 'Please add a text value']
        },
        name: {
            type: String,
            required: [true, 'Please add a text value']
        },
        lastname: {
            type: String,
            required: [true, 'Please add a text value']
        },
        born_date: {
            type: mongoose.Schema.Types.Date,
            required: [true, 'Please add a date value']
        },
        profile_picture: {
            type: String,
            required: [true, 'Please add a text value']
        },
        sex: {
            type: String,
            required: [true, 'Please add a text value']
        },
        email: {
            type: String,
            required: [true, 'Please add a text value']
        },
        phone: {
            type: String,
            required: [true, 'Please add a text value']
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);