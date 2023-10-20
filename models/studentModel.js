const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        email : {
            type : String,
            unique : true,
            required : [true,"Email is required"],
            match : [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                'Please fill a valid email address']
        },
        password : {
            type : String,
            select : false,
            maxLength : [15,"Password should not exceed more than 15 characters"],
            minLength : [6,"Password should have atleast 6 characters"],
            // match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a valid Password"]
        }
    },{timestamps : true}
)


const Student = mongoose.model("Student",studentSchema);

module.exports = Student;