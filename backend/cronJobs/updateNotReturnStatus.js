const cron = require('node-cron');
const Borrow = require('../models/borrow');
const User = require('../models/user');
const Fine = require('../models/fine');
const Book = require('../models/books');


// Will Run once per hour
const updateNotReturnStatus = cron.schedule('0 * * * *',async ()=>{
    console.log('Running cron job to update Not Return statuses...');
    try {
        // Find all documents where endTimer is less than or equal to current time
        const notReturnBorrows = await Borrow.find({
            status:"Borrowed",
            endTimer: { $lte: new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
        });

        // Update each found document to set status to "Expired"
        await Promise.all(notReturnBorrows.map(async borrow => {
            borrow.status = 'NotReturned';
            await borrow.save();
            await createFine(borrow._id, borrow.userId, borrow.bookId); // This will create a new Fine
        }));       

        console.log(`${notReturnBorrows.length} borrows updated to NotReturned.`);
    } catch (error) {
        console.error('Error updating borrows:', error.message);
    }
});

// Function that create new Fine
const createFine = async(borrowId,userId,bookId)=>{
    try{
        const userName = await User.findById(userId);
        const bookName = await Book.findById(bookId);
        // Later Change this with error
        if(!userName){
            userName.name = 'User Name not found';
        }
        if(!bookName){
            bookName.Name = 'book Name not found';
        }
        await Fine.insertMany({
            borrowId : borrowId,
            userId : userId,
            userName : userName.name,
            bookId : bookId,
            bookName : bookName.Name,     
        });
    }catch(error){
        console.log(error);
    }    
}

module.exports = updateNotReturnStatus;