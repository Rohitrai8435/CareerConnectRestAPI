const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        students : [{type : mongoose.Schema.ObjectId, ref : "Student"}],
        employe : {type : mongoose.Schema.ObjectId, ref : "Employe"},
        title : String,
        skill : String,
        jobptype : {type : String, enum : ["In office","Remote"]},
        openings : Number,
        description : String,
        preference : String,
        salary : Number,
        perks : String,
        assesments : String,
    },{timestamps : true}
)


const job = mongoose.model("Job",jobSchema);

module.exports = job;