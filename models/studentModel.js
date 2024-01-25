const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const studentSchema = mongoose.Schema(
    {
        firstname : {
            type : String,
            required : [true,"First Name is required"],
            minLength : [3,"First Name should be atleast 3 character long"]
        },
        lastname : {
            type : String,
            required : [true,"First Name is required"],
            minLength : [3,"First Name should be atleast 3 character long"]
        },
        contact : {
            type : String,
            required : [true,"Contact is required"],
            minLength : [10,"Contact should be atleast 10 character long"],
            maxLength : [10,"Contact should not exceed 10 character"]
        },
        city : {
            type : String,
            required : [true,"City Name is required"],
            minLength : [3,"City Name should be atleast 3 character long"]
        },
        gender: {type : String,enum : ["Male","Female","Other"]},
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
            required : [true,"Password is required"],
            maxLength : [15,"Password should not exceed more than 15 characters"],
            minLength : [6,"Password should have atleast 6 characters"],
            // match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a valid Password"]
        },
        resetPasswordToken : {
            type : String,
            default : "0"
        },
        avatar : {
            type : Object,
            default : {
                fileId : '',
                url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJHtLNj7M2GqTtcijfgVGjSK5BWMLlI1Q8pPYNc6G6ZYMQyXUiPWQhK19MtmGh6A6POM&usqp=CAU'
            }
        },

        resume : {
            education : [],
            jobs : [],
            internships : [],
            responsibilites : [],
            courses : [],
            projects : [],
            skills : [],
            accomplishments : [],
        },
        internships : [
            {type : mongoose.Schema.Types.ObjectId, ref : "Internship"},
        ],
        jobs : [
            {type : mongoose.Schema.Types.ObjectId, ref : "Job"},
        ]

    },{timestamps : true}
)

studentSchema.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})
studentSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password,this.password);
}

studentSchema.methods.getjwtToken = function(){
    return jwt.sign({id : this.id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRE});
}
const Student = mongoose.model("Student",studentSchema);

module.exports = Student;