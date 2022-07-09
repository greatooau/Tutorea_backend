const express = require("express");
const router = express.Router();
const {
    getTutors,
    getTutor,
    getTutorsByCategory,
    loginTutor,
    getMyStudents,
    getMe,
    changePassword,
    preregister,
    addInsights,
    addStudies,
    addContacts,
} = require("../controllers/tutorController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTutors);

router.route("/me").get(protect, getMe);

router.route("/students").get(protect, getMyStudents);

//Login del tutor
router.route("/login").post(loginTutor);
//TODO: Calar este endpoint
router.route("/password").post(protect, changePassword);
//TODO: Calar este endpoint
router.route("/pre-register").post(preregister);
//TODO: Calar este endpoint
router.route("/insights").post(protect, addInsights);
//TODO: Calar este endpoint
router.route("/contacts").post(protect, addContacts);
//TODO: Calar este endpoint
router.route("/studies").post(protect, addStudies);

router.route("/:id").get(protect, getTutor);

router.route("/category/:category").get(protect, getTutorsByCategory);

module.exports = router;
