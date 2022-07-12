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
    editProfile
} = require("../controllers/tutorController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get( getTutors);

router.route("/me").get(protect, getMe);

router.route("/:id")
    .put(editProfile)

router.route("/students").get(protect, getMyStudents);
//TODO: FALTA HACER UN ENDPOINT PARA EDITAR LA INFO DEL TUTOR
//Login del tutor
router.route("/login").post(loginTutor);
//TODO: Calar este endpoint YA FUNCIONA PA
router.route("/password").post(protect, changePassword);
//TODO: Calar este endpoint YA FUNCIONA PA
router.route("/").post(preregister);
//TODO: Calar este endpoint YA FUNCIONA PA
router.route("/insights").post(protect, addInsights);
//TODO: Calar este endpoint YA FUNCIONA PA
router.route("/contacts").post(protect, addContacts);
//TODO: Calar este endpoint YA FUNCIONA PA
router.route("/studies").post(protect, addStudies);

router.route("/:id").get(protect, getTutor);

router.route("/category/:category").get(protect, getTutorsByCategory);

module.exports = router;
