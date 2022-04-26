const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Tutor = require("../models/tutorModel");
const { findOneAndUpdate } = require("../models/userModel");

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

  if (
    !name ||
    !email ||
    !password ||
    !username ||
    !lastname ||
    !born_date /* || 
        !profile_picture */ ||
    !sex ||
    !phone
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.end()
});

/**
 * @description This method is used to get just one user by ID.
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
  res.status(200).json({
    id: _id,
    name,
    lastname,
    email,
    profile_picture,
    username,
    sex,
    born_date,
    phone,
  });
  res.end()
});

/**
 * @desc    Authenticate a user
 * @route   POST /api/users/login
 * @access  Public
 */

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //Check for user username
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  res.end()
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

  const updatedGoal = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
  res.end()
});
/**
 * @desc    Add tutor to user's "myTutors" Field
 * @route   POST /api/users/tutors
 * @access  Private
 */
const addToMyTutors = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.body.tutorId);

  if (!tutor) {
    res.status(400);
    throw new Error("Tutor not found");
  }

  await User.updateOne({ _id:req.user.id }, {$push:{ myTutors: req.body.tutorId}})
  res.status(200)
  res.end()
});

    /*     const insights = await Insights.find();
        const studies = await Studies.find();
        const contacts = await Contacts.find(); */
/**
 * @description This method is used to get all the tutors from Database.
 * @route GET api/tutors
 * @access Private
 */

 const getMyTutors = asyncHandler( async(req, res) => {
    const myTutors = await User.findById(req.user.id).populate('myTutors')
        res.json(myTutors);
        res.status(200);
        res.end()
    });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  loginUser,
  registerUser,
  editUser,
  getMe,
  addToMyTutors,
  getMyTutors
};
