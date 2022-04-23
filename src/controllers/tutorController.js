const asyncHandler = require('express-async-handler');
const Tutor = require('../models/tutorModel');
const Insights = require('../models/insightsModel');
const Contacts = require('../models/contactsModel');
const Studies = require('../models/studiesModel');

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
    res.json({tutors:tutors, /* insights:insights, studies:studies, contacts:contacts */});
    res.status(200);
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
    } else {
        const insights = await Insights.find({tutor:req.params.id});
        const studies = await Studies.find({tutor:req.params.id});
        const contacts = await Contacts.find({tutor:req.params.id});
        res.status(200).json({tutor:tutor, insights: insights, studies: studies, contacts: contacts});
    }
});

/**
 * @description This method is used to register a new tutor.
 * @route POST api/tutors
 * @access Private
 */
//Este método será implementado después
const registerTutor = (req, res) => {
    res.json({
        message:'prueba POST'
    });
    res.status(200);
}

module.exports = {
    getTutors,
    getTutor,
    registerTutor
}