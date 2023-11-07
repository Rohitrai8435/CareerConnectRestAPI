exports.sendtoken = (student,statusCode,res)=>{
    const token = student.getjwtToken();

    const options = {
        expires : new Date( 
            Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000
            ),
        httpOnly : true,
        // secure : true,
    }

    res.status(statusCode)
    .cookie("token",token,options);
    // .json({sucess : true,id : student._id,token});
};