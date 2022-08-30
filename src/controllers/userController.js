const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Tutor = require("../models/tutorModel");
const { findOneAndUpdate, findByIdAndUpdate } = require("../models/userModel");
const PayData = require('../models/payDataModel');

/**
 * @description This method is used to register a new user.
 * @route       POST api/users
 * @access      Public
 * This works
 */
const registerUser = asyncHandler(async (req, res) => {
    const {
      username,
      password,
      name,
      lastname,
      born_date,
      profile_picture,
      sex,
      email,
      phone,
    } = req.body;

    /* if (
      !name ||
      !email ||
      !password ||
      !username ||
      !lastname ||
      !born_date /* || 
          !profile_picture  ||
      !sex ||
      !phone
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    */

    const userExists = await User.findOne({ email, username });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      lastname,
      born_date,
      profile_picture,
      sex,
      email,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, 'user'),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
    res.end();
});

/**
 * @description This method the info of the user who's logged in.
 * @route GET api/users/:id
 * @access Private
 */

const getMe = asyncHandler(async (req, res) => {
    const {
      _id,
      name,
      email,
      profile_picture,
      lastname,
      username,
      sex,
      born_date,
      phone,
      myTutors,

    } = await User.findById(req.user.id);

    const payData = await PayData.findOne({user:req.user.id})
    const response = {
      id: _id,
      name,
      lastname,
      email,
      profile_picture,
      username,
      sex,
      born_date,
      phone,
      myTutors,
    }
    if(payData) {
      res.status(200).json({
        ...response,
        payData
      });
    } else {
      res.status(200).json({
        ...response
      });
    }
    
    res.end();
});

/**
 * @desc    Authenticate a user
 * @route   POST /api/users/login
 * @access  Public
 */

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  //Check for user username
    const user = await User.findOne({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        token: generateToken(user._id, 'user'),
		role:'user'
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
    res.end();
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private
 */
//WORKS
const editUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

	res.status(200).json(updatedUser);
	
	res.end();
});
/**
 * @desc    Add tutor to user's "myTutors" Field
 * @route   POST /api/users/tutors
 * @access  Private
 */
const addToMyTutors = asyncHandler(async (req, res) => {
    const tutor = await Tutor.findById(req.body.tutorId);
    
    const { myTutors } = User.findById(req.user.id)

    if (!tutor) {
      res.status(400);
      throw new Error("Tutor not found");
    }
    if(!myTutors.includes(req.body.tutorId))
      await User.updateOne(
        { _id: req.user.id },
        { $push: { myTutors: req.body.tutorId } }
      );

    res.status(200).json(tutor);
    res.end();
});

/*     const insights = await Insights.find();
        const studies = await Studies.find();
        const contacts = await Contacts.find(); */
/**
 * @description This method is used to get all the tutors from Database.
 * @route GET api/tutors
 * @access Private
 */

const getMyTutors = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate("myTutors");
    res.json(user.myTutors);
    res.status(200);
    res.end();
});

const deleteFromMyTutors = asyncHandler(async (req, res) => {
    await User.updateOne(
      { _id: req.user.id },
      { $pullAll: { myTutors: [req.body.tutorId] } }
    );
    res.json({
      message: "Tutor with id " + req.body.tutorId + " has been deleted."
    })
    res.status(200)
    res.end()
});

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const changePassword = asyncHandler( async(req, res) => {
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const user = await User.findById(req.user.id)
  const flag = await bcrypt.compare(oldPassword, user.password)
  if(!user && !flag) {
    res.status(400)
    res.end()//por si acaso pa
    throw new Error('Password incorrect')
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  console.log(hashedNewPassword)
  await User.updateOne(
    { _id: req.user.id },
    { $set: { password: hashedNewPassword } }
  )
  
  res.status(200)
  res.json({message: 'Exito al cambiar la contraseña'})
  res.end()
})

const editPayInfo = asyncHandler(
	async (req, res) => {
		const update = req.body.update
		console.log(update)
		if (update) {
		await PayData.findOneAndUpdate(
			{ user: req.user.id },
			{...req.body}
		)
		} else {
		await PayData.create({
			user:req.user.id,
			...req.body
		})
		}
		
		res.status(200)
		res.json({message:`La información de pago del usuario ${req.user.id} ha sido actualizada.`})
		res.end()
	}
)

module.exports = {
	editPayInfo,
	loginUser,
	registerUser,
	editUser,
	getMe,
	addToMyTutors,
	getMyTutors,
	deleteFromMyTutors,
	changePassword
};
