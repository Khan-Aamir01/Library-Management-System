const User = require('../models/user');

//Get User
const getAllUser = async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:"Server error due to "+ error});
    }
};

//Get User by ID
const getUserbyID = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:"Server error due to "+ error});
    }
}

// Create User
const createUser = async(req,res)=>{
    const{name,gmail,address,phoneNumber} = req.body;
    try{
        const newUser = new User({
           name,
           gmail,
           address,
           phoneNumber,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
        res.status(500).json({message:"Server error due to "+ error});
    }
}

//Update User
const updateUser = async(req,res)=>{
    const{name,gmail,address,phoneNumber} = req.body;
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.name = name || user.name;
        user.gmail = gmail || user.gmail;
        user.address = address || user.address;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }
    catch(error){
        res.status(500).json({message:"Server error due to "+ error});
    }
}

// Delete User
const deleteUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch(error){
        res.status(500).json({message:"Server error due to "+ error});
    }
}

module.exports = {
    getAllUser,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser,
};