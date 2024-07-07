const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Book',
    },
    status:{
        type:String,
        default:"Waiting",
    },
    startTimer:{
        type:Date,
        default: function() {
            return new Date(Date.now() + 5.5 * 60 * 60 * 1000); // Convert UTC to IST
        }
    },
    endTimer: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 5.5 * 61 * 60 * 1000); // Added 3 hour timer on it
        }
    },
    borrowDate:{
        type:Date,
        default:null,      
    },
    returnDate:{
        type:Date,
        default:null,
    }
});

const Borrow = mongoose.model('Borrow',borrowSchema)

module.exports = Borrow;
