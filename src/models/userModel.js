const mongoose = require('mongoose');
/**
 * User schema
 */
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a username value']
        },
        password: {
            type: String,
            required: [true, 'Please add a password value']
        },
        name: {
            type: String,
            required: [true, 'Please add a name value']
        },
        lastname: {
            type: String,
            required: [true, 'Please add a lastname value']
        },
        born_date: {
            type: String,
            required: [true, 'Please add a date value']
        },
        profile_picture: {
            type: String,
            required: [true, 'Please add a text value']
        },
        sex: {
            type: String,
            required: [true, 'Please add a sex value']
        },
        email: {
            type: String,
            required: [true, 'Please add a email value']
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone value']
        },
        myTutors: [
            { type:mongoose.Schema.Types.ObjectId, required: true, ref:'Tutor' }
        ],
        payData:{
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema, 'users');