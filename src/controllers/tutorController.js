const asyncHandler = require('express-async-handler');
const Tutor = require('../models/tutorModel');
const Insights = require('../models/insightsModel');
const Contacts = require('../models/contactsModel');
const Studies = require('../models/studiesModel');


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
    getTutorsByCategory,
    loginTutor
}