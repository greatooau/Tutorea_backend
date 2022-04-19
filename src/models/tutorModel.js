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
            required: true
        },
        studies: [
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
            }
        ],
        insigths: [
            {
                name: {
                    type:String,
                    required:true
                }
            }
        ],
        fee: {
            type:Number,
            required:true
        },
        contacts: [
            {
                name:{
                    type:String,
                    required:true
                },
                contact:{
                    type:String,
                    required:true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tutor', tutorSchema);