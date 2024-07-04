const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        let res = await mongoose.connect('mongodb://localhost:27017/LMS');
        if(res){
            console.log("Successfully Connected to DB");
        }
    }
    catch(error){
        console.log("Error occured while connection to DB : " + error);
    }
 
}
module.exports = connectDb;
