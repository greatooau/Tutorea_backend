const mongoose = require('mongoose');
const insightsSchema = mongoose.Schema(
    {
        tutor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Tutor'
        },
        name: {
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Insights', insightsSchema, 'insights');