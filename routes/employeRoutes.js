const express = require('express');
const router = express.Router();
const {
    currentemploye, 
    employesignup,
    employesignin,
    employesignout,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
 } = require('../controllers/employeControllers.js');

 const { isAuthenticated } = require("../middlewares/auth.js");


// POST /employee
router.post("/",isAuthenticated,currentemploye);


// POST /signup
router.post("/signup",employesignup)

// POST /signin
router.post("/signin",employesignin)

// GET /signout
router.get("/signout",isAuthenticated,employesignout)

// POST /send-mail
router.post("/send-mail",employesendmail)

//GET /forget-link/:id"
router.post("/forget-link/",employeforgetlink);

//POST /reset-password/:id"
router.post("/reset-password/:id",isAuthenticated,employeresetpassword);

//POST /update/:id"
router.post("/update/:id",isAuthenticated,employeupdate);

// //POST /orgnigationlogo/:id"
router.post("/avatar/:id",isAuthenticated,employeavatar);

// POST /employe/internship/create 
router.post("/internship/create",isAuthenticated,createinternship);

// POST /employe/internship/read
router.post("/internship/read",isAuthenticated,readinternship);

// POST /employe/internship/read/:id
router.post("/internship/read/:id",isAuthenticated,readsingleinternship);



// POST /employe/jobs/create 
router.post("/job/create",isAuthenticated,createjob);

// POST /employe/jobs/read
router.post("/job/read",isAuthenticated,readjob);

// POST /employe/jobs/read/:id
router.post("/job/read/:id",isAuthenticated,readsinglejob);

module.exports = router;