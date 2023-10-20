const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel.js");
const ErorrHandler = require("../utils/ErrorHandler");
exports.homepage = catchAsyncErrors(async (req,res,next)=>{
    
    res.json({message : "Hello postman from routes callback from controllers"});
});

exports.studentsignup = catchAsyncErrors(async (req,res,next)=>{
    const student = await new studentModel(req.body).save();
    res.status(201).json(student);
});
exports.studentsignin = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findOne({email:req.body.email}).select("+password").exec();

    if(!student) return next(new ErorrHandler("User not found with this email",404));

    const isMatch = studentModel.comparePassword(req.body.password);
    if(!isMatch) return next(new ErorrHandler("Wron Credientials",500));
    res.json(student);
});
exports.studentsignout = catchAsyncErrors(async (req,res,next)=>{

});
