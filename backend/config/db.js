const mongoose = require('mongoose');
const updateExpiredStatus = require('../cronJobs/updateExpiredStatus')
const updateNotReturnStatus = require('../cronJobs/updateNotReturnStatus');

const connectDb = async ()=>{
    try{
        let res = await mongoose.connect(process.env.DB_URL);
        if(res){
            console.log("Successfully Connected to DB");
            updateExpiredStatus.start();
            updateNotReturnStatus.start();
        }
    }
    catch(error){
        console.log("Error occured while connection to DB : " + error);
    }
 
}
module.exports = connectDb;
