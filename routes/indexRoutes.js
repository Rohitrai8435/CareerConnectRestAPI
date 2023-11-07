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
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyjob,
    applyinternship,
    allinternship,
    alljobs,
    readinternship,
 } = require('../controllers/indexControllers.js');

 const { isAuthenticated } = require("../middlewares/auth.js");

//GET /
router.get("/",homepage);

// POST /student
router.post("/student",isAuthenticated,currentstudent);


// POST /students/signup
router.post("/student/signup",studentsignup)

// POST /students/signin
router.post("/student/signin",studentsignin)

// GET /students/signout
router.get("/student/signout",isAuthenticated,studentsignout)

// POST /students/send-mail
router.post("/student/send-mail",studentsendmail)

//GET /student/forget-link/:id"
router.post("/student/forget-link/",studentforgetlink);

//POST /student/reset-password/:id"
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword);

//POST /student/reset-password/:id"
router.post("/student/update/:id",isAuthenticated,studentupdate);

//POST /student/reset-password/:id"
router.post("/student/avatar/:id",isAuthenticated,studentavatar);


// -  - -   -   -   -   -   -   - APPLY INTERNSHIP    -    -   -   -   -   -   -

// POST /student/read/:internshipid
router.post("/student/read/internship/:internshipid",readinternship);

// POST /allinternship
router.post("/allinternship/",allinternship);

// POST /student/apply/:jobid
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship);




// -  - -   -   -   -   -   -   - APPLY JOB    -    -   -   -   -   -   -

// POST /student/read/:jobid
router.post("/student/apply/job/:jobid",applyjob);

//POST  /alljobs
router.post("/alljobs/",alljobs);
// POST /student/apply/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

module.exports = router;