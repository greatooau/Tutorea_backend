const mongoose = require('mongoose');
const contactsSchema = mongoose.Schema(
    {
        tutor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Tutor'
        },
        name:{
            type:String,
            required:true
        },
        contact:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Contacts', contactsSchema, 'contacts');