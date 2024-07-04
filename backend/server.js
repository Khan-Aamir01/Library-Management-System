require('dotenv').config({ path: '../.env' });

const express = require('express');
const connectDb = require('./config/db.js')
const bookRoutes = require('./routes/bookRoutes.js')


const app = express();
connectDb();

app.use(express.json()); // To get Req is JSON format

app.use('/api',bookRoutes);

app.get('/',(req,res)=>{
    res.send('Home Route');
})
const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Server is Running');
})