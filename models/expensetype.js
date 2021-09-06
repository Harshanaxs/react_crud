const mongoose = require('mongoose');


const expenseTypeSchema = new mongoose.Schema({

   
    type:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
    


})

module.exports = mongoose.model('ExpenseType',expenseTypeSchema);