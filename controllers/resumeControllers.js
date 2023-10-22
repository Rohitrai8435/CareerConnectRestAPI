const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req,res,next)=>{
   const {resume} = await studentModel.findById(req.id).exec();

   res.json({resume});
})

exports.addeducation = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.education.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({student});
})

exports.editeducation = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.education.findIndex((i)=>i.id===req.params.eduid);

   student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "Eduction Updated",student});
})

exports.deleteeducation = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filterededu = student.resume.education.filter(
    (education)=> education.id !== req.params.eduid
   )

   student.resume.education = filterededu;

   await student.save();
   res.json({message : "Eduction Deleted",student});
})


exports.addjob = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.jobs.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "jobs added",student});
})

exports.editjob = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.jobs.findIndex((i)=>i.id===req.params.jobid);

   student.resume.jobs[eduIndex] = {
    ...student.resume.jobs[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "Jobs Updated",student});
})

exports.deletejob = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.jobs.filter(
    (job)=> job.id !== req.params.jobid
   )

   student.resume.jobs = filteredjob;

   await student.save();
   res.json({message : "Job Deleted",student});
})



exports.addinternship = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.internships.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "internship added",student});
})

exports.editinternship = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.internships.findIndex((i)=>i.id===req.params.internshipid);

   student.resume.internships[eduIndex] = {
    ...student.resume.internships[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "internship Updated",student});
})

exports.deleteinternship = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.internships.filter(
    (job)=> job.id !== req.params.internshipid
   )

   student.resume.internships = filteredjob;

   await student.save();
   res.json({message : "internship Deleted",student});
})

exports.addresponsibilites = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.responsibilites.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "responsibiles added",student});
})

exports.editresponsibilites = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.responsibilites.findIndex((i)=>i.id===req.params.responsibilitesid);

   student.resume.responsibilites[eduIndex] = {
    ...student.resume.responsibilites[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "responsibilites Updated",student});
})

exports.deleteresponsibilites = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.responsibilites.filter(
    (job)=> job.id !== req.params.responsibilitesid
   )

   student.resume.responsibilites = filteredjob;

   await student.save();
   res.json({message : "responsibilites Deleted",student});
})



exports.addcourses = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.courses.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "courses added",student});
})

exports.editcourses = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.courses.findIndex((i)=>i.id===req.params.coursesid);

   student.resume.courses[eduIndex] = {
    ...student.resume.courses[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "courses Updated",student});
})

exports.deletecourses = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.courses.filter(
    (job)=> job.id !== req.params.coursesid
   )

   student.resume.courses = filteredjob;

   await student.save();
   res.json({message : "courses Deleted",student});
})


exports.addprojects = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.projects.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "projects added",student});
})

exports.editprojects = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.projects.findIndex((i)=>i.id===req.params.projectsid);

   student.resume.projects[eduIndex] = {
    ...student.resume.projects[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "projects Updated",student});
})

exports.deleteprojects = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.projects.filter(
    (job)=> job.id !== req.params.projectsid
   )

   student.resume.projects = filteredjob;

   await student.save();
   res.json({message : "projects Deleted",student});
})


exports.addskills = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.skills.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "skills added",student});
})

exports.editskills = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.skills.findIndex((i)=>i.id===req.params.skillsid);

   student.resume.skills[eduIndex] = {
    ...student.resume.skills[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "skills Updated",student});
})

exports.deleteiskills = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.skills.filter(
    (job)=> job.id !== req.params.skillsid
   )

   student.resume.skills = filteredjob;

   await student.save();
   res.json({message : "skills Deleted",student});
})


exports.addaccomplishments = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   student.resume.accomplishments.push({...req.body,id : uuidv4()});
   await student.save();
   res.json({message : "accomplishments added",student});
})

exports.editaccomplishments = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const eduIndex = student.resume.accomplishments.findIndex((i)=>i.id===req.params.accomplishmentsid);

   student.resume.accomplishments[eduIndex] = {
    ...student.resume.accomplishments[eduIndex],
    ...req.body
   }
   await student.save();
   res.json({message : "accomplishments Updated",student});
})

exports.deleteaccomplishments = catchAsyncErrors(async (req,res,next)=>{
   const student = await studentModel.findById(req.id).exec();

   const filteredjob = student.resume.accomplishments.filter(
    (job)=> job.id !== req.params.accomplishmentsid
   )

   student.resume.accomplishments = filteredjob;

   await student.save();
   res.json({message : "accomplishments Deleted",student});
})
