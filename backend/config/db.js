const mongoose = require('mongoose');
const cronJob = require('../cronJobs/updateExpiredStatus')

const connectDb = async ()=>{
    try{
        let res = await mongoose.connect(process.env.DB_URL);
        if(res){
            console.log("Successfully Connected to DB");
            cronJob.start();
        }
    }
    catch(error){
        console.log("Error occured while connection to DB : " + error);
    }
 
}
module.exports = connectDb;
