const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel.js")
exports.homepage = catchAsyncErrors(async (req,res,next)=>{
    
    res.json({message : "Hello postman from routes callback from controllers"});
});

exports.studentsignup = catchAsyncErrors(async (req,res,next)=>{
    const student = await new studentModel(req.body).save();
    res.status(201).json(student);
});
