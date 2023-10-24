const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel.js");
const internshipModel = require("../models/internshipModel.js");
const jobModel = require("../models/jobModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const {sendtoken} = require("../utils/SendToken.js");
const { sendmail } = require("../utils/NodeMailer.js")
const imagekit = require("../utils/imagekit.js").initImageKit();
const path = require('path');

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
    res.status(201).json(student);
});

exports.studentsignin = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findOne({email:req.body.email}).select("+password").exec();

    if(!student) return next(new ErrorHandler("User not found with this email",404));

    const isMatch = student.comparePassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wron Credientials",500));
    sendtoken(student,200,res);
    res.json({student});
});

exports.studentsignout = catchAsyncErrors(async (req,res,next)=>{
    res.clearCookie('token')
    .json({message : "successfully signout!!"});
});

exports.studentsendmail = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findOne({email : req.body.email}).exec();

    if(!student){
        return next(new ErrorHandler("User not found with this email address",404))
    }

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    
    sendmail(req,res,next,url);
    student.resetPasswordToken = "1";
    await student.save();
});

exports.studentforgetlink = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findById(req.params.id).exec();

    if(!student) return next(new ErrorHandler("User not found with this email",404));

    if(student.resetPasswordToken === "1"){
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    }else{
        return next(new ErrorHandler("Invailid Reset Password Link",500));
    }

    res.status(200).json({
        message : "Password has been Successfully changed"
    })
});

exports.studentresetpassword = catchAsyncErrors(async (req,res,next)=>{
    
    const student = await studentModel.findById(req.params.id).exec();

    student.password = req.body.password;
    await student.save();

    res.status(200).json({
        message : "Password has been Successfully Reset"
    })
    sendtoken(student,201,res);

});

exports.studentupdate = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findByIdAndUpdate(req.params.id,req.body).exec();
    await student.save();
    
    res.status(200).json({
        success : true,
        message : "Student Updated Successfull",
        student,
    })
});

exports.studentavatar = catchAsyncErrors(async (req,res,next)=>{

    const student = await studentModel.findById(req.params.id).exec();
    const file = req.files.avatar;

    const momdifiedName = `imagekit-${Date.now()}${path.extname(file.name)}`

    if(student.avatar.fileId!=="")
    {
        await imagekit.deleteFile(student.avatar.fileId);
    }
    const {fileId,url} = await imagekit.upload({
        file : file.data,
        fileName : momdifiedName
    })
    student.avatar = {fileId,url};
    await student.save();
    res.status(200).json({
        success : true,
        message : "File uploaded Successfull",
    })

});


//  -   -   -   -   - APPLY INTERNSHIPS     -   -   -   -       --  -   -
exports.applyinternship = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec();
    const internship = await internshipModel.findById(req.params.internshipid).exec();

    if(!internship) return next(new ErrorHandler("Internship not found",404));

    student.internships.push(internship._id);
    internship.students.push(student._id);

    await student.save();
    await internship.save();
    res.json({student,internship})
})

//  -   -   -   -   - APPLY JOBS     -   -   -   -       --  -   -
exports.applyjob = catchAsyncErrors(async (req,res,next)=>{
    const student = await studentModel.findById(req.id).exec();
    const job = await internshipModel.findById(req.params.jobid).exec();

    if(!job) return next(new ErrorHandler("Internship not found",404));

    student.jobs.push(job._id);
    job.students.push(student._id);

    await student.save();
    await job.save();
    res.json({student,job})
})