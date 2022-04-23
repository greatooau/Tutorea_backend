const mongoose = require('mongoose');
const insightsSchema = mongoose.Schema(
    {
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