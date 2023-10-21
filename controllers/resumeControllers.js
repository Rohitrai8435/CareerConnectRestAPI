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
