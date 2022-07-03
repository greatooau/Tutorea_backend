const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Tutor = require('../models/tutorModel')

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            switch(decoded.role) {
                case 'user':
                    //Get user from token
                    req.user = await User.findById(decoded.id).select('-password');
                    //req.user.role = decoded.role
                    break;
                case 'tutor':
                    req.tutor = await Tutor.findById(decoded.id).select('-password');
                    //req.tutor.role = decoded.role
                    break;
                default:
                    throw 'NO AUTORIZADO'
            }
            //CALAR

            next();
        } catch(e) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (token === undefined) {
        res.status(401);
        throw new Error('tu token no está definido')
    }
    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }


});

module.exports = { protect };