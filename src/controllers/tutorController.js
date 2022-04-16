const asyncHandler = require('express-async-handler');

/**
 * @description This method is used to get all the tutors from Database.
 * @route GET api/tutors
 * @access Private
 */

const getTutors = (req, res) => {
    res.json({
        message:'prueba GET'
    });
    res.status(200);
};

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