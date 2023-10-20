const express = require('express');
const router = express.Router();
const { 
    homepage, 
    studentsignup,
    studentsignin,
    studentsignout
 } = require('../controllers/indexControllers.js')

//GET /
router.get("/",homepage);


// POST /students/signup
router.post("/students/signup",studentsignup)

// POST /students/signin
router.post("/students/signin",studentsignin)

// GET /students/signout
router.get("/students/signout",studentsignout)

module.exports = router;