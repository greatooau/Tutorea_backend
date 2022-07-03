const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({ study:String, school:String, img: String})

const insightSchema = new mongoose.Schema({ name: String })

const contactSchema = new mongoose.Schema({ name:String, contact:String })

const tutorSchema = mongoose.Schema(
    {
        //Usuario
        username:{
            type:String,
            required:true  
        },
        //Contraseña
        password:{
            type:String,
            required:true  
        },
        //Correo
        email:{
            type:String,
            required:true
        },
        //Nombre
        name:{
            type: String,
            required:true
        },
        //Apellido
        lastname:{
            type: String,
            required:true
        },
        //Foto de perfil
        profile_picture:{
            type: String,
            required: true
        },
        //Categoría
        category: {
            type: String,
            required: true
        },
        //Especialización
        specialization: {
            type: String,
            required: true
        },
        //Estrellas
        stars: {
            type: Number,
            required: true
        },
        //Cuota
        fee: {
            type:Number,
            required:true
        },
        //Estatus
        status: {
            type: String,
            required:true
        },
        //Sexo
        sex: {
            type: String,
            required:true
        },
        //Cuenta bancaria
        bank_account: {
            type:Number,
            required:true
        },
        //Estudios
        studies:[studySchema],
        //Conocimientos
        insights:[insightSchema],
        //Contactos
        contacts: [contactSchema]

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Tutor', tutorSchema, 'tutors');