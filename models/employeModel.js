const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const employeSchema = mongoose.Schema(
    {
        firstname : {
            type : String,
            required : [true,"First Name is required"],
            minLength : [4,"First Name should be atleast 4 character long"]
        },
        lastname : {
            type : String,
            required : [true,"First Name is required"],
            minLength : [4,"First Name should be atleast 4 character long"]
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
            maxLength : [15,"Password should not exceed more than 15 characters"],
            minLength : [6,"Password should have atleast 6 characters"],
            // match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,"Please fill a valid Password"]
        },
        resetPasswordToken : {
            type : String,
            default : "0"
        },
        organizationname : {
            type : String,
            required : [true,"Organization Name is required"],
            minLength : [4,"Organization Name should be atleast 4 character long"]
        },
        avatar : {
            type : Object,
            default : {
                fileId : "",
                url : "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=987&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }
        },
        internships : [
            {type : mongoose.Schema.Types.ObjectId, ref : "Internship"},
        ],
        jobs : [
            {type : mongoose.Schema.Types.ObjectId, ref : "Job"},
        ]

    },{timestamps : true}
)

employeSchema.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt);
})
employeSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password,this.password);
}

employeSchema.methods.getjwtToken = function(){
    return jwt.sign({id : this.id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRE});
}
const employe = mongoose.model("Employe",employeSchema);

module.exports = employe;