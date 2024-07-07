const Fine = require('../models/fine');

const getAllFine = async (req,res) =>{
    try{
        const fine = await Fine.find();
        res.status(200).json(fine);
    }
    catch(error){
        res.status(500).json({message:'Server Error due to '+ error});
    }
};

const getFineById = async (req,res)=>{
    try{
        const fine = await Fine.findById(req.params.id);
        if(!fine){
            return res.status(404).json({message:'Fine not Found'});
        }
        res.status(200).json(fine);
    }
    catch(error){
        res.status(500).json({message:'Server Error due to '+ error});
    }
};

const createFine = async (req,res)=>{
    const{borrowId,userId,bookId,status,amount,paidDate} = req.body;
    try{
        const newFine = new Fine({
            borrowId,
            userId,
            bookId,
            status,
            amount,
            paidDate
        });
        await newFine.save();
        res.status(201).json({message:'new Fine Created'});
    }catch(error){
        res.status(500).json({message:'Server Error due to '+ error});
    }
};

// Could be written cleaner
const updateFine = async(req,res)=>{
    const {newStatus,newAmount,paidDate} = req.body;
    try{
        const fine = await Fine.findById(req.params.id);
        if(!fine){
            return res.status(404).json({message:'Fine not Found'});
        }
        fine.borrowId = fine.borrowId;
        fine.userId = fine.userId;
        fine.bookId = fine.bookId;
        fine.status = newStatus ?? fine.status;
        fine.amount = newAmount ?? fine.amount;
        fine.paidDate = paidDate ?? fine.paidDate;

        const updatedFine = await fine.save();
        res.status(200).json(updatedFine);
    }catch(error){
        res.status(500).json({message:'Server Error due to '+ error});
    }
};

const deleteFine = async (req,res)=>{
    try{
        const fine = await Fine.findById(req.params.id);
        if(!fine){
            return res.status(404).json({message:'Fine not Found'});
        }
        const deletedFine = await fine.deleteOne();
        res.status(200).json(deletedFine);
    }catch(error){
        res.status(500).json({message:'Server Error due to '+ error});
    }
}

module.exports = {
    getAllFine,
    getFineById,
    createFine,
    updateFine,
    deleteFine
};
