const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config{};




const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/',(req,res)=>{
    res.send("Welcome to My Hotel...How can I help you ?")
})



const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(PORT,()=>{
    console.log("server started")
})