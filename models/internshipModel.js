const mongoose = require('mongoose');

const internshipSchema = mongoose.Schema(
    {
        students : [{type : mongoose.Schema.ObjectId, ref : "Student"}],
        employe : {type : mongoose.Schema.ObjectId, ref : "Employe"},
        profile : String,
        skill : String,
        internshiptype : {type : String, enum : ["In office","Remote"]},
        openings : Number,
        from : String,
        to : String,
        duration : String,
        responsibility : String,
        stipend : {
            status : {type : String, enum : ["Fixed","Negotiable","Performance based","Unpaid"]},
            amount : Number,
        },
        perks : String,
        assesments : String,
    },{timestamps : true}
)


const internship = mongoose.model("Internship",internshipSchema);

module.exports = internship;