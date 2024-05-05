const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();




const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Node to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);




app.get('/',function(req,res){
    res.send("Welcome to My Hotel...How can I help you ?")
})



const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.listen(PORT,()=>{
    console.log("server started")
})