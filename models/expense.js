const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({

   
    expenseId:{
        type: String,
        required: true
    }, 
    date:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }, 
    billNumber:{
        type: Number,
        required: true
    },
    billValue:{
        type: Number,
        required: true
    }
    


})

module.exports = mongoose.model('Expense',expenseSchema);