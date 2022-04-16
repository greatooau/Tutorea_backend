const asyncHandler = require('express-async-handler');

/**
 * @description This method is used to get all the users from Database.
 * @route GET api/users
 * @access Private
 */

const deleteUser = (req, res) => {
    res.json({
        message:'prueba DELETE'
    });
    res.status(200);
};

/**
 * @description This method is used to get just one user by ID.
 * @route GET api/users/:id
 * @access Private
 */

 const getUser = (req, res) => {
    res.json({
        message:'prueba GET, un user'
    });
    res.status(200);
};
/**
 * @description This method is used to register a new user.
 * @route POST api/users
 * @access Private
 */
const registerUser = (req, res) => {
    res.json({
        message:'prueba POST'
    });
    res.status(200);
}

module.exports = {
    deleteUser,
    getUser,
    registerUser
}