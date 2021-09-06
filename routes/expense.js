const express = require('express');
const expense = require('../models/expense');
//const expense = require('../models/expense');
const Expense = require('../models/expense'); //import user model

const router = express.Router(); //send http request

//crate expense 
router.post('/expense/add',(req,res)=>{

    let newExpense = new Expense(req.body);

    newExpense.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Expense created Successfully!"
        });

        });
});

//get expense
router.get('/expense',(req,res)=>{
    Expense.find().exec((err,expenses)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingExpenses: expenses
        });
    }) ;          
});


//get specic post
router.get("/expense/:id",(req,res)=>{
    let eId = req.params.id;
    Expense.findById(eId,(err,expense)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            expense
        });
    });
});


//update expense
router.put('/expense/update/:id',(req,res)=>{
    Expense.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,expense)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete expense

router.delete('/expense/delete/:id',(req,res)=>{
    Expense.findByIdAndRemove(req.params.id).exec((err,deletedexpense)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedexpense
        });

    });
});




module.exports = router;


