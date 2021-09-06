const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({

    empNo:{
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true // this is back end validation 
    },
    email : {
        type : String,
        required : true
    },
    nic : {
        type: String,
        required : true
    },
    mobileNo : {
        type: Number,
        required : true
    },
    designation: {
        type: String,
        required : true
    },
    department: {
        type: String,
        required : true
    }, 
    


})

module.exports = mongoose.model('Employee',employeeSchema);