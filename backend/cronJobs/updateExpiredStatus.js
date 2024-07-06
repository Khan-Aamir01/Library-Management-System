const cron = require('node-cron');
const Borrow = require('../models/borrow');

// This will Run after every 5 min
const cronJob = cron.schedule('*/5 * * * *', async () => {
    console.log('Running cron job to update expired statuses...');

    try {
        // Find all documents where endTimer is less than or equal to current time
        const expiredBorrows = await Borrow.find({
            status:"Waiting",
            endTimer: { $lte: new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
        });

        // Update each found document to set status to "Expired"
        await Promise.all(expiredBorrows.map(async borrow => {
            borrow.status = 'Expired';
            await borrow.save();
        }));

        console.log(`${expiredBorrows.length} borrows updated to Expired.`);
    } catch (error) {
        console.error('Error updating borrows:', error.message);
    }
});

module.exports = cronJob;