const express = require('express');
const router = express.Router();
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addinternship,
    editinternship,
    deleteinternship,
    addresponsibilites,
    editresponsibilites,
    deleteresponsibilites,
    addcourses,
    editcourses,
    deletecourses,
    addprojects,
    editprojects,
    deleteprojects,
    addskills,
    editskills,
    deleteiskills,
    addaccomplishments,
    editaccomplishments,
    deleteaccomplishments,
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

                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   JOBS     -   -   --  -   -   -   -   -   --  
//POST /add-job
router.post('/add-job',isAuthenticated,addjob);

//POST /edit-job
router.post('/edit-job/:jobid',isAuthenticated,editjob);

//POST /delete-job
router.post('/delete-job/:jobid',isAuthenticated,deletejob);

                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   INTERNSHIPS    -   -   --  -   -   -   -   -   --  
//POST /add-internship
router.post('/add-internship',isAuthenticated,addinternship);

//POST /edit-internship
router.post('/edit-internship/:internshipid',isAuthenticated,editinternship);

//POST /delete-internship
router.post('/delete-internship/:internshipid',isAuthenticated,deleteinternship);


                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   RESPONSIBILITES    -   -   --  -   -   -   -   -   --  
//POST /add-responsibilites
router.post('/add-responsibilites',isAuthenticated,addresponsibilites);

//POST /edit-responsibilites
router.post('/edit-responsibilites/:responsibilitesid',isAuthenticated,editresponsibilites);

//POST /delete-responsibilites
router.post('/delete-responsibilites/:responsibilitesid',isAuthenticated,deleteresponsibilites);



                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   COURSES    -   -   --  -   -   -   -   -   --  
//POST /add-coureses
router.post('/add-courses',isAuthenticated,addcourses);

//POST /edit-coureses
router.post('/edit-courses/:coursesid',isAuthenticated,editcourses);

//POST /delete-coureses
router.post('/delete-courses/:coursesid',isAuthenticated,deletecourses);

                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   PROJECTS    -   -   --  -   -   -   -   -   --  
//POST /add-projects
router.post('/add-projects',isAuthenticated,addprojects);

//POST /edit-projects
router.post('/edit-projects/:projectsid',isAuthenticated,editprojects);

//POST /delete-projects
router.post('/delete-projects/:projectsid',isAuthenticated,deleteprojects);


                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   SKILLS    -   -   --  -   -   -   -   -   --  
//POST /add-skills
router.post('/add-skills',isAuthenticated,addskills);

//POST /edit-skills
router.post('/edit-skills/:skillsid',isAuthenticated,editskills);

//POST /delete-skills
router.post('/delete-skills/:skillsid',isAuthenticated,deleteiskills);


                                    // --  -   -   -   -   -   -   -   -   -   -   -   -   ACCOMPLISMENTS    -   -   --  -   -   -   -   -   --  
//POST /add-accomplishments
router.post('/add-accomplishments',isAuthenticated,addaccomplishments);

//POST /edit-accomplishments
router.post('/edit-accomplishments/:accomplishmentsid',isAuthenticated,editaccomplishments);

//POST /delete-accomplishments
router.post('/delete-accomplishments/:accomplishmentsid',isAuthenticated,deleteaccomplishments);

module.exports = router;