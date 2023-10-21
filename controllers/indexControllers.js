const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel.js");
const ErorrHandler = require("../utils/ErrorHandler");
const {sendtoken} = require("../utils/SendToken.js");
exports.homepage = catchAsyncErrors(async (req,res,next)=>{
    res.json({message : "secure homepage"});
});

exports.currentstudent = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec();

    res.json({student})
})

exports.studentsignup = catchAsyncErrors(async (req,res,next)=>{
    const student = await new studentModel(req.body).save();
    sendtoken(student,201,res);
    // res.status(201).json(student);
});
exports.studentsignin = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findOne({email:req.body.email}).select("+password").exec();

    if(!student) return next(new ErorrHandler("User not found with this email",404));

    const isMatch = student.comparePassword(req.body.password);
    if(!isMatch) return next(new ErorrHandler("Wron Credientials",500));
    sendtoken(student,200,res);
    // res.json(student);
});
exports.studentsignout = catchAsyncErrors(async (req,res,next)=>{
    res.clearCookie('token')
    .json({message : "successfully signout!!"});
});
