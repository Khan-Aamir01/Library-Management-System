const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
    createdOn:{
        type:Date,
        default: function() {
            return new Date(Date.now() + 5.5 * 60 * 60 * 1000); // Convert UTC to IST
        }
    },
    borrowId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Borrow',
    },
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
        default:'notPaid',
    },
    amount:{
        type:Number,
        default:100,
    },
    paidDate:{
        type:Date,
        default:null,
    }
});

const Fine = mongoose.model('Fine',fineSchema);

module.exports = Fine;