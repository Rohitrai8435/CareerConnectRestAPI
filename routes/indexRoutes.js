const express = require('express');
const router = express.Router();
const {
    homepage,
    currentstudent, 
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword
 } = require('../controllers/indexControllers.js');

 const { isAuthenticated } = require("../middlewares/auth.js");

//GET /
router.get("/",isAuthenticated,homepage);

// POST /student
router.post("/student",isAuthenticated,currentstudent);


// POST /students/signup
router.post("/students/signup",studentsignup)

// POST /students/signin
router.post("/students/signin",studentsignin)

// GET /students/signout
router.get("/students/signout",isAuthenticated,studentsignout)

// POST /students/send-mail
router.post("/students/send-mail",studentsendmail)

//GET /student/forget-link/:id"
router.get("/students/forget-link/:id",studentforgetlink);

//POST /student/reset-password/:id"
router.post("/students/reset-password/:id",isAuthenticated,studentresetpassword);

module.exports = router;