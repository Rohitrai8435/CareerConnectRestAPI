const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        students : [{type : mongoose.Schema.ObjectId, ref : "Student"}],
        employe : {type : mongoose.Schema.ObjectId, ref : "Employe"},

        title : String,
        skill : String,
        organizationname : String,
        jobtype : {type : String, enum : ["Wrok From Office","Wrok From Home","Hibrid"]},
        openings : Number,
        description : String,
        preference : String,
        salary : Number,
        location : String,
        duration : String,
        perks : String,
        assesments : String,
    },{timestamps : true}
)


const job = mongoose.model("Job",jobSchema);

module.exports = job;