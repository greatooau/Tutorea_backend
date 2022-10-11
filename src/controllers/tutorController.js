const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Tutor = require("../models/tutorModel");
const Sessions = require("../models/sessionsModel")
const Transactions = require("../models/transactionModel");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const User = require("../models/userModel")
/**
 * @description This method is used to login as a tutor.
 * @route GET api/tutors/login
 * @access Public
 */
const loginTutor = asyncHandler(async (req, res) => {
    //Recibe usuario y contraseña del tutor
    const { username, password } = req.body;
    //Busca al tutor en la DB
    const tutor = await Tutor.findOne({ username: username });
    //Si el tutor existe, y su contraseña es la correcta, entonces...
    if (tutor && (await bcrypt.compare(password, tutor.password))) {
        res.status(200).json({
            token: generateToken(tutor._id, "tutor"),
            role: "tutor",
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    res.end();
});

//METODO PARA REALIZAR EL PRE REGISTRO DEL TUTOR
/**
 * @description This method is used to pre-register as a tutor.
 * @route GET api/tutors/pre-register
 * @access Public
 */
const preregister = asyncHandler(async (req, res) => {
    const {
        username, //username
        password, //password
        name, //name
        fee, //AÑADIR EN FRONTEND
        lastname, //lastname
        category, //category
        specialization, //specialization
        email, //email
    } = req.body;

    if (
        !username || //username
        !password || //password
        !name || //name
        !lastname || //lastname
        !fee ||
        !category || //category
        !specialization || //specialization
        !email //email
    ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const tutorExists = await Tutor.findOne({ email, username });

    if (tutorExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CHECAR QUE CONCUERDE CON EL MODELO
    const tutor = await Tutor.create({
        username, //username
        password: hashedPassword, //password
        name, //name
        lastname, //lastname
        category, //category
        specialization, //specialization
        email, //email
        phone: "", // NO se si incluirlo, no creo
        fee,
        sex: "",
        bank_account: "",
        born_date: "",
        studies: [],
        insights: [],
        contacts: [],
        stars:0,
        status: "PENDIENTE", //ACTIVO, RECHAZADO
        profile_picture:
            "https://imgs.search.brave.com/BBWmpwlbk30sxtRiwzETZbbQ9qNDoeUAIpLNqBhzPmo/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5ndWltLmNvLnVr/L3N5cy1pbWFnZXMv/R3VhcmRpYW4vUGl4/L3BpY3R1cmVzLzIw/MTUvNi85LzE0MzM4/NjA4ODg1MDMvQWxi/ZXJ0LUVpbnN0ZWlu/Li0tMDA5LmpwZw",
    });

    if (tutor) {
        res.status(201).json({
            _id: tutor.id,
            name: tutor.name,
            email: tutor.email,
            token: generateToken(tutor._id, "tutor"),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.end();
});

const addStudies = asyncHandler(async (req, res) => {
    const { study, school, img } = req.body;

    if (!(study && school)) {
        res.status(400);
        res.end();
        throw new Error(
            "You need to provide both study and school to create a new study."
        );
    }

    await Tutor.updateOne(
        { _id: req.tutor._id },
        { $push: { studies: req.body } }
    );
    res.status(200).end();
});

const addContacts = asyncHandler(async (req, res) => {
    const { type, contact } = req.body;

    if (!(type && contact)) {
        res.status(400);
        res.end();
        throw new Error(
            "You need to provide both type and contact to create a new contact."
        );
    }

    await Tutor.updateOne(
        { _id: req.tutor._id },
        { $push: { contacts: req.body } }
    );
    res.status(200).end();
});

const addInsights = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        res.end();
        throw new Error(
            "You need to provide a name to create a new insight."
        );
    }

    await Tutor.updateOne(
        { _id: req.tutor._id },
        { $push: { insights: req.body } }
    );
    res.status(200).end();
});

const editProfile = asyncHandler(
    async(req, res) => {
    const tutor = await Tutor.findById(req.params.id);

	if (!tutor) {
		res.status(400);
		throw new Error("Tutor not found");
	}

	const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json(updatedTutor);
	
	res.end();
    }
)

const changePassword = asyncHandler(async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user = await Tutor.findById(req.tutor._id);
    const flag = await bcrypt.compare(oldPassword, user.password);

    if (!user || !flag) {
        res.status(400);
        throw new Error("Password incorrect");
        
         //por si acaso pa
        
    }
    if (newPassword === ''){
        throw new Error("You need to provide a password");
        res.status(400);
        res.end(); //por si acaso pa
        
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await Tutor.updateOne(
        { _id: req.tutor._id },
        { $set: { password: hashedNewPassword } }
    );

    res.status(200);
    res.json({ message: "Exito al cambiar la contraseña" });
    res.end();
});
//METODO PARA OBTENER LOS ESTUDIANTES DEL TUTOR
/**
 * @description This method is used to get all the tutor's students.
 * @route GET api/tutors/students
 * @access Private
 */
const getMyStudents = asyncHandler(async (req, res) => {// para probar
    //TODO: Hacer que se tenga la propiedad "active" para el schema de transactions
    const transactions = await Transactions.find({
        $and: [{ tutor: req.tutor._id }, { activo: 1 }],
    }).populate("user").populate("session");
    //Variable auxiliar
    const students = [];

    transactions.forEach((transaction) => {
        students.push({
            id: transaction._id, //id
            student: transaction.user, //usuario completo
            sesions: transaction.sesions, //numero de sesiones
            session: transaction.session
        });
    });

    //Enviar
    res.json(students);
    res.status(200);
    res.end();
});
//FALTA DESARROLLAR PRE-REGISTRO CON CARGA DE ARCHIVOS Y ENVIO AL CORREO

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getMe = asyncHandler(async (req, res) => {
    const {
        _id,
        name,
        email,
        profile_picture,
        lastname,
        username,
        specialization,
        fee,
        category,
        sex,
        born_date,
        phone,
        bank_account,
        status,
        studies,
        contacts,
        insights

    } = await Tutor.findById(req.tutor._id);

    const response = {
        id: _id,
        name,
        email,
        profile_picture,
        lastname,
        username,
        specialization,
        fee,
        category,
        sex,
        born_date,
        phone,
        bank_account,
        status,
        contacts, 
        studies,
        insights
    };
    res.status(200).json(response);

    res.end();
});

/**
 * @description This method is used to get all the tutors from Database.
 * @route GET api/tutors
 * @access Private
 */

const getTutors = asyncHandler(async (req, res) => {
    
    const tutors = await Tutor.find({status:req.query.status});
    /*     const insights = await Insights.find();
    const studies = await Studies.find();
    const contacts = await Contacts.find(); */
    res.json(
        tutors /* insights:insights, studies:studies, contacts:contacts */
    );
    res.status(200);
    res.end();
});

/**
 * @description This method is used to get all the tutors from Database by category.
 * @route GET api/tutors
 * @access Private
 */

const getTutorsByCategory = asyncHandler(async (req, res) => {
    const tutors = await Tutor.find({ category: req.params.category, status: req.query.status });
    /*     const insights = await Insights.find();
    const studies = await Studies.find();
    const contacts = await Contacts.find(); */
    res.json(tutors);
    res.status(200);
    res.end();
});

/**
 * @description This method is used to get just one Tutor by ID.
 * @route GET api/tutors/:id
 * @access Private
 */

const getTutor = asyncHandler(async (req, res) => {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
        res.status(400);
        throw new Error("Tutor doesn't exist");
    } else {
        /* 
        const insights = await Insights.find({tutor:req.params.id});
        const studies = await Studies.find({tutor:req.params.id});
        const contacts = await Contacts.find({tutor:req.params.id}); */
        res.status(200).json(tutor);
    }
    res.end();
});

const getSessions = asyncHandler( async (req, res) => {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let from = new Date(year, month, day);
    let to = new Date(year, month, day + 1)

    const sessions = await Sessions.find({ tutor: req.params.tutorId }).gt('createdAt', from).lt('createdAt', to)
    

    
    res.status(200).json(sessions).end()
});

const addSessions = asyncHandler( 
    async (req, res) => 
    {
        const date = new Date();

        let day = date.getDate() + 1;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const { tutor, code } = req.body
        const hours = require("../hours.json");

        const { name } = hours.find( hour => hour.value === code);

        try
        {
            const session = await Sessions.create(
                            {
                                code,
                                tutor,
                                schedule: `${day}/${month}/${year}##${name}`
                            });
            if (session)
                res.status(200).json({ session_id:session._id }).end()
            else
                res.status(500).json({ message: "New session couldn't be created. Function: " +  addSessions.name }).end()
        }
        catch(e) 
        {
            throw new Error("Object couldn't be created. This happened in " + addSessions.name + " func.")
        }
    }
);
module.exports = 
{
    addSessions,
    getTutorSessions: getSessions,
    getTutors,
    getTutor,
    getMyStudents,
    getTutorsByCategory,
    loginTutor,
    getMe,
    changePassword,
    preregister,
    addInsights,
    addContacts,
    addStudies,
    editProfile
};
