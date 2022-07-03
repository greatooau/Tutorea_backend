const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const Tutor = require('../models/tutorModel');
const Insights = require('../models/insightsModel');
const Contacts = require('../models/contactsModel');
const Studies = require('../models/studiesModel');
const Transactions = require('../models/transactionModel')


/**
 * @description This method is used to login as a tutor.
 * @route GET api/tutors/login
 * @access Public
 */
const loginTutor = asyncHandler ( 
    async (req, res) => {
        //Recibe usuario y contraseña del tutor
        const { username, password } = req.body
        //Busca al tutor en la DB
        const tutor = await Tutor.findOne({ username: username });
        //Si el tutor existe, y su contraseña es la correcta, entonces...
        if (tutor && (await bcrypt.compare(password, tutor.password))) {
            res.status(200).json({token: generateToken(tutor._id), role: 'tutor'});
        }
        else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
        
        res.end()
    }
)

//METODO PARA REALIZAR EL PRE REGISTRO DEL TUTOR
/**
 * @description This method is used to pre-register as a tutor.
 * @route GET api/tutors/pre-register
 * @access Public
 */
 const preregister = asyncHandler(async (req, res) => {
    const {
      username,//username
      password,//password
      name,//name
      fee, //AÑADIR EN FRONTEND
      lastname,//lastname
      category,//category
      specialization,//specialization
      email,//email
    } = req.body;

    /* if (
      !username ||//username
      !password ||//password
      !name ||//name
      !lastname ||//lastname
      !fee ||
      !category ||//category
      !specialization ||//specialization
      !email//email
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    */

    const tutorExists = await Tutor.findOne({ email, username });

    if (tutorExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CHECAR QUE CONCUERDE CON EL MODELO
    const tutor = await Tutor.create({
        username,//username
        password: hashedPassword,//password
        name,//name
        lastname,//lastname
        category,//category
        specialization,//specialization
        email,//email
        phone:"",
        fee,
        sex:"",
        bank_account:"",
        born_date:"",
        studies:[],
        insights:[],
        contacts:[],
        status:"PENDIENTE",//ACTIVO, RECHAZADO
        profile_picture:"https://imgs.search.brave.com/BBWmpwlbk30sxtRiwzETZbbQ9qNDoeUAIpLNqBhzPmo/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5ndWltLmNvLnVr/L3N5cy1pbWFnZXMv/R3VhcmRpYW4vUGl4/L3BpY3R1cmVzLzIw/MTUvNi85LzE0MzM4/NjA4ODg1MDMvQWxi/ZXJ0LUVpbnN0ZWlu/Li0tMDA5LmpwZw"
    
    });

    if (tutor) {
      res.status(201).json({
        _id: tutor.id,
        name: tutor.name,
        email: tutor.email,
        token: generateToken(tutor._id, 'tutor'),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
    res.end();
});

//METODO PARA OBTENER LOS ESTUDIANTES DEL TUTOR
/**
 * @description This method is used to get all the tutor's students.
 * @route GET api/tutors/students
 * @access Private
 */
const getMyStudents = asyncHandler (
    async (req, res) => {
        req.tutor._id = "626750fa1889a7f90071d3de" // para probar

        const transactions = await Transactions.find({ tutor: req.tutor._id }).populate("tutor");
        
        //Variable auxiliar
        const students = []

        transactions.forEach(transaction => {
            students.push(
            { 
                    id: transaction._id, //id
                    student: transaction.user, //usuario completo
                    sesions: transaction.sesions //numero de sesiones
                }
            )
        });
        
        //Eliminar el campo contraseña del objeto student
        students.forEach(user => {
            delete user.student.password
        });

        //Enviar 
        res.json(students);
        res.status(200);
        res.end();
    }
);
//FALTA DESARROLLAR PRE-REGISTRO CON CARGA DE ARCHIVOS Y ENVIO AL CORREO

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getMe = asyncHandler(
    async(req, res) => {
        
        

        res.end()
    }
)


/**
 * @description This method is used to get all the tutors from Database.
 * @route GET api/tutors
 * @access Private
 */

const getTutors = asyncHandler( async(req, res) => {
    const tutors = await Tutor.find()
/*     const insights = await Insights.find();
    const studies = await Studies.find();
    const contacts = await Contacts.find(); */
    res.json(tutors /* insights:insights, studies:studies, contacts:contacts */);
    res.status(200);
    res.end()
});

/**
 * @description This method is used to get all the tutors from Database by category.
 * @route GET api/tutors
 * @access Private
 */

const getTutorsByCategory = asyncHandler( async(req, res) => {
    const tutors = await Tutor.find({category:req.params.category})
/*     const insights = await Insights.find();
    const studies = await Studies.find();
    const contacts = await Contacts.find(); */
    res.json(tutors);
    res.status(200);
    res.end()
});


/**
 * @description This method is used to get just one Tutor by ID.
 * @route GET api/tutors/:id
 * @access Private
 */

const getTutor = asyncHandler( async(req, res) => {
    const tutor = await Tutor.findById(req.params.id);
    if(!tutor) {
        res.status(400);
        throw new Error("Tutor doesn't exist");
    } else {/* 
        const insights = await Insights.find({tutor:req.params.id});
        const studies = await Studies.find({tutor:req.params.id});
        const contacts = await Contacts.find({tutor:req.params.id}); */
        res.status(200).json(tutor);
    }
    res.end()
});



module.exports = {
    getTutors,
    getTutor,
    getMyStudents,
    getTutorsByCategory,
    loginTutor
}