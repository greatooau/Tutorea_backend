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
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref:'Studies'
                }
            }
        ],
        insights: [
            {
                insight: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref:'Insights'
                }
            }
        ],
        fee: {
            type:Number,
            required:true
        },
        contacts: [
            {
                contact:{
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref:'Contacts'
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tutor', tutorSchema, 'tutors');