const mongoose = require('mongoose');
const contactsSchema = mongoose.Schema(
    {
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