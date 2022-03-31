const asyncHandler = require('express-async-handler');

/**
 * @description getTutors
 * @route GET api/tutors
 * @access Private
 */

const getTutors = (req, res) => {
    res.json({
        message:'prueba GET'
    })
    res.status(200);
};

module.exports = {
    getTutors
}