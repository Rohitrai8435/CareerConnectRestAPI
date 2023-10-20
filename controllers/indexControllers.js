const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

exports.homepage = catchAsyncErrors(async (req,res,next)=>{
    
    res.json({message : "Hello postman from routes callback from controllers"});
})