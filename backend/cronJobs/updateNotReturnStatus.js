const cron = require('node-cron');
const Borrow = require('../models/borrow');


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
        }));

        console.log(`${notReturnBorrows.length} borrows updated to NotReturned.`);
    } catch (error) {
        console.error('Error updating borrows:', error.message);
    }
});

module.exports = updateNotReturnStatus;