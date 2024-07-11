const User = require('../models/user')
const bcrypt = require('bcryptjs')
const register = async (req, res)=>{
    const {name,image,gmail,password,address,phoneNumber} = req.body;
    try{
        const checkGmail = await User.find({gmail:gmail});
        if(checkGmail.length > 0){
            console.log(checkGmail)
            return res.status(200).json({message:'Email Already Exist'});
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            image,
            gmail,
            password : hashedPassword,
            address,
            phoneNumber
        });
        await newUser.save();
        res.status(201).json({message:'User registered successfully'});
    }catch (error) {
        res.status(500).json({message:'server error due to ' + error});
    }
}
// Funtion to hash the passord
const hashPassword = async (password)=>{
    const saltRound = 10;
    try{
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }catch (error) {
        console.error('Error hashing password:', error);
        throw error //Add throw error for security
    }
}
module.exports = register;

