const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const employeModel = require("../models/employeModel.js");
const internshipModel = require("../models/internshipModel.js");
const jobModel = require("../models/jobModel.js");
const ErrorHandler = require("../utils/ErrorHandler");
const {sendtoken} = require("../utils/SendToken.js");
const { sendmail } = require("../utils/NodeMailer.js")
const imagekit = require("../utils/imagekit.js").initImageKit();
const path = require('path');



exports.currentemploye = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findById(req.id).exec();

    res.json({employe})
})

exports.employesignup = catchAsyncErrors(async (req,res,next)=>{
    const student = await new employeModel(req.body).save();
    sendtoken(student,201,res);
    // res.status(201).json(student);
});

exports.employesignin = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findOne({email:req.body.email}).select("+password").exec();

    if(!employe) return next(new ErrorHandler("User not found with this email",404));

    const isMatch = employe.comparePassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wron Credientials",500));
    sendtoken(employe,200,res);
    // res.json(employe);
});

exports.employesignout = catchAsyncErrors(async (req,res,next)=>{
    res.clearCookie('token')
    .json({message : "successfully signout!!"});
});

exports.employesendmail = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findOne({email : req.body.email}).exec();

    if(!employe){
        return next(new ErrorHandler("User not found with this email address",404))
    }

    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;
    
    sendmail(req,res,next,url);
    employe.resetPasswordToken = "1";
    await employe.save();
});

exports.employeforgetlink = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findById(req.params.id).exec();

    if(!employe) return next(new ErrorHandler("User not found with this email",404));

    if(employe.resetPasswordToken === "1"){
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save();
    }else{
        return next(new ErrorHandler("Invailid Reset Password Link",500));
    }

    res.status(200).json({
        message : "Password has been Successfully changed"
    })
});

exports.employeresetpassword = catchAsyncErrors(async (req,res,next)=>{
    
    const employe = await employeModel.findById(req.params.id).exec();

    employe.password = req.body.password;
    await employe.save();

    res.status(200).json({
        message : "Password has been Successfully Reset"
    })
    sendtoken(employe,201,res);

});

exports.employeupdate = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findByIdAndUpdate(req.params.id,req.body).exec();
    await employe.save();
    
    res.status(200).json({
        success : true,
        message : "employe Updated Successfull",
        employe,
    })

});

exports.employeavatar = catchAsyncErrors(async (req,res,next)=>{

    const employe = await employeModel.findById(req.params.id).exec();
    const file = req.files.logo;

    const momdifiedName = `imagekit-${Date.now()}${path.extname(file.name)}`

    if(employe.organizationlogo.fileId!=="")
    {
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }
    const {fileId,url} = await imagekit.upload({
        file : file.data,
        fileName : momdifiedName
    })
    employe.organizationlogo = {fileId,url};
    await employe.save();
    res.status(200).json({
        success : true,
        message : "File uploaded Successfull",
    })
});

// -    -   -   -   -   -   -   -   -   -   -   -   -   -INTERNSHIP-    -   -   -   -   -   -   -
exports.createinternship = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findById(req.id).exec();
    const internship = await new internshipModel(req.body);
    internship.employe = employe._id;
    await internship.save();
    if(!employe) return next(new ErrorHandler("Employe not found",404));
    employe.internships.push(internship._id);

    await employe.save();
    res.status(201).json({success : true, internship});
});

exports.readinternship = catchAsyncErrors(async (req,res,next)=>{
    const { internships } = await employeModel.findById(req.id).populate('internships').exec();
    res.status(201).json({success : true,internships})
});

exports.readsingleinternship = catchAsyncErrors(async (req,res,next)=>{
    const internship = await internshipModel.findById(req.params.id).exec();
    if(!internship) return next(new ErrorHandler("Internship not found",404));
    res.status(201).json({success : true, internship});
});



// -    -   -   -   -   -   -   -   -   -   -   -   -   -JOB-    -   -   -   -   -   -   -
exports.createjob = catchAsyncErrors(async (req,res,next)=>{
    const employe = await employeModel.findById(req.id).exec();
    const job = await new jobModel(req.body);
    job.employe = employe._id;
    await job.save();
    
    await employe.save();
    res.status(201).json({success : true, job});
});

exports.readjob = catchAsyncErrors(async (req,res,next)=>{
    const { jobs } = await employeModel.findById(req.id).populate('jobs').exec();

    if(!jobs) return next(new ErrorHandler("job not found",404));
    res.status(201).json({success : true,jobs})
});

exports.readsinglejob = catchAsyncErrors(async (req,res,next)=>{
    const job = await jobModel.findById(req.params.id).exec();
    if(!job) return next(new ErrorHandler("job not found",404));
    res.status(201).json({success : true, job});
});