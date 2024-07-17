
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

const changeStatustoBorrow = async (req,res)=>{
    const newStatus = 'Borrowed';
    const currentTime = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    const endTimer = new Date(Date.now()+ (168 + 5.5) * 60 * 60 * 1000); // 168 = 7 days
    try{
        const borrow = await Borrow.findById(req.params.id);
        if(!borrow){
            return res.status(404).json({message:'Borrow not found'});
        }
        borrow.userId = borrow.userId;
        borrow.bookId = borrow.bookId;
        borrow.status = newStatus;
        borrow.startTimer = currentTime;
        borrow.endTimer = endTimer;
        borrow.borrowDate = currentTime;
        borrow.returnDate = borrow.returnDate;

        const updatedBorrow = await borrow.save();
        res.status(200).json(updatedBorrow);
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
}

const changeStatustoReturn = async (req,res)=>{
    const newStatus = "Returned";
    const returnDate = new Date(Date.now() + 5.5 * 60 * 60 * 1000);

    try{
        const borrow = await Borrow.findById(req.params.id);
        if(!borrow){
            return res.status(404).json({message:'Borrow not found'});
        }
        borrow.userId = borrow.userId;
        borrow.bookId = borrow.bookId;
        borrow.status = newStatus;
        borrow.startTimer = borrow.startTimer;
        borrow.endTimer = borrow.endTimer;
        borrow.borrowDate = borrow.borrowDate;
        borrow.returnDate = returnDate;

        const updatedBorrow = await borrow.save();
        res.status(200).json(updatedBorrow);
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error})
    }
}

const getStatus = async (req,res)=>{
    try{
        const statusBorrow = await Borrow.find({ status: req.params.status});
        if(!statusBorrow || statusBorrow.length === 0 ){
            return res.status(404).json({message:'No Book found'});
        }
        res.status(200).json(statusBorrow);
    }
    catch(error){
        res.status(500).json({message:'server error due to '+ error});
    }
}

module.exports = {
    getAllBorrow,
    getBorrowById,
    createBorrow,
    deleteBorrow,
    changeStatustoBorrow,
    changeStatustoReturn,
    getStatus
};