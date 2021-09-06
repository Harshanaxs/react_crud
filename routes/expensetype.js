const express = require('express');

const Expensetype = require('../models/expensetype'); //import user model

const router = express.Router(); //send http request

//crate expensetype 
router.post('/expensetype/add',(req,res)=>{

    let newExpenseType = new Expensetype(req.body);

    newExpenseType.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Expense Type created Successfully!"
        });

        });
});

//get expensetype
router.get('/expensetype',(req,res)=>{
    Expensetype.find().exec((err,expenses)=>{
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
router.get("/expensetype/:id",(req,res)=>{
    let eId = req.params.id;
    Expensetype.findById(eId,(err,expensetype)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            expensetype
        });
    });
});


//update expensetype
router.put('/expensetype/update/:id',(req,res)=>{
    Expensetype.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,expensetype)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            })
        }
    );
});

//delete expensetype

router.delete('/expensetype/delete/:id',(req,res)=>{
    Expensetype.findByIdAndRemove(req.params.id).exec((err,deletedexpense)=>{
        if (err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });
        return res.json({
            message:"Delete Successful",deletedexpense
        });

    });
});




module.exports = router;


