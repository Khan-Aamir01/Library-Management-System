const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gmail:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    dateOfJoin:{
        type : Date,
        default : Date.now,
    }
});

const User = mongoose.model('User',userSchema);



module.exports = User;