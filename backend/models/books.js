const { Schema, default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
    Name : {
        type:String,
        required : true
    },
    Author_Name :{
        type:String,
        required:true
    },

    Categories :{
        type:String,
        required:true
    },
    std:{
        type:String
    },
    isPhysical :{
        type:Boolean,
        required:true
    },
    isEbook : {
        type:Boolean,
        required:true
    },
    Downloads : {
        type:Number,
        default:0
    },
    Availability :{
        type:Number,
        required:true,
    },
    ImageUrl : {
        type:String,
        required:true,
    },
    DownloadUrl :{
        type :String,
        default:null,
    },
    Date :{
        type:Date,
        default:Date.now,
    }
});

const Book = mongoose.model('Book',bookSchema);


module.exports = Book;