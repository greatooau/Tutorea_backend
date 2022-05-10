const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { registerUser, getMe, editUser, addToMyTutors, loginUser, getMyTutors,
        deleteFromMyTutors, changePassword, editPayInfo } = require('../controllers/userController');

router.route('/')
    .post(registerUser);//testeada

router.route('/:id')
    .put(protect, editUser);//testeada

router.route('/me')
    .get(protect, getMe);//testeada

router.route('/mytutors')
    .post(protect, addToMyTutors)//testeada
    .get(protect, getMyTutors)//testeada
    

router.route('/mytutors/delete')
    .post(protect, deleteFromMyTutors)//testeada
    
router.route('/login')
    .post(loginUser);//testeada

router.route('/password')
    .post(protect, changePassword)//testeada

router.route('/editUser/:id')
    .put(protect, editUser)//testeada

router.route('/payData')
    .post(protect, editPayInfo)//testeada
module.exports = router;