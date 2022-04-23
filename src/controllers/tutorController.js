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

const getTutor = (req, res) => {
    res.json({
        message:'prueba GET, un tutor'
    });
    res.status(200);
};
/**
 * @description This method is used to register a new tutor.
 * @route POST api/tutors
 * @access Private
 */
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