const mongoose = require('mongoose');

const internshipSchema = mongoose.Schema(
    {
        students : [{type : mongoose.Schema.ObjectId, ref : "Student"}],
        employe : {type : mongoose.Schema.ObjectId, ref : "Employe"},
        organizationname : String,
        title : String,
        skill : String,
        internshiptype : {type : String, enum : ["In office","Remote","Hibrid"]},
        openings : Number,
        from : String,
        to : String,
        duration : String,
        location : String,
        responsibility : String,
        stipend : String,
        perks : String,
        assesments : String,
    },{timestamps : true}
)


const internship = mongoose.model("Internship",internshipSchema);

module.exports = internship;