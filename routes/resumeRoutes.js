const express = require('express');
const router = express.Router();
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation
 } = require('../controllers/resumeControllers.js');

 const { isAuthenticated } = require("../middlewares/auth.js");

//GET /
router.get('/',isAuthenticated,resume);

//POST /add-edu
router.post('/add-edu',isAuthenticated,addeducation);

//POST /edit-edu
router.post('/edit-edu/:eduid',isAuthenticated,editeducation);

//POST /delete-edu
router.post('/delete-edu/:eduid',isAuthenticated,deleteeducation);

module.exports = router;