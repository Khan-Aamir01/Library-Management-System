require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db.js')
const bookRoutes = require('./routes/bookRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const borrowRoutes = require('./routes/borrowRoutes.js')
const fineRoutes = require('./routes/fineRoutes.js')


const app = express();
connectDb();

app.use(express.json()); // To get Req is JSON format
app.use(cors());

app.use('/api',bookRoutes);
app.use('/api',userRoutes);
app.use('/api',borrowRoutes);
app.use('/api',fineRoutes);

app.get('/',(req,res)=>{
    res.send('Home Route');
})
const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Server is Running');
})