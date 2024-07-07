const Borrow = require('../models/borrow.js');

// Get All Borrow 
const getAllBorrow = async (req,res)=>{
    try{
        const borrow = await Borrow.find();
        res.status(200).json(borrow);
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
};

// Get Borrow by ID
const getBorrowById = async (req,res)=>{
    try{
        const borrow = await Borrow.findById(req.params.id);
        if(!borrow){
            return res.status(404).json({message:'Borrow not found'});
        }
        res.status(200).json(borrow);
    }catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
}

// Create a Borrow 
const createBorrow = async (req,res)=>{
    const{userId,bookId} = req.body;
    try{
        const borrow = new Borrow({
            userId,
            bookId
        });
        const createdBorrow = await borrow.save();
        res.status(201).json(createdBorrow)
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
}

// Delete Borrow 
const deleteBorrow = async (req,res)=>{
    try{
        const borrow = await Borrow.findById(req.params.id);
        if(!borrow){
            return res.status(404).json({message:'Borrow not found'}); 
        }
        const deletedBorrow = await borrow.deleteOne();
        res.status(200).json(deletedBorrow);
    }catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }

}

// This will be call by admin to change the borrow status to 'Borrowed'

const changeBorrowStatus = async (req,res)=>{
    const newStatus = req.body.status;
    try{
        const updatedBorrow = await Borrow.findByIdAndUpdate(req.params.id,{ status: newStatus },{new:true});
        if(!updatedBorrow){
            return res.status(404).json({message:'Borrow not found'});
        }
        res.status(200).json(updatedBorrow);
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
}

module.exports = {
    getAllBorrow,
    getBorrowById,
    createBorrow,
    deleteBorrow,
    changeBorrowStatus
};