const express = require('express');
const router = express.Router();
const { homepage, studentsignup } = require('../controllers/indexControllers.js')

router.get("/",homepage);

// POST /students/signup

router.post("/students/signup",studentsignup)

module.exports = router;