const mongoose = require('mongoose'); 
require('dotenv').config();


//define the mongodb connection url
//const mongoUrl = process.env.mongoUrlLocal  //----> Local Database Url
const mongoUrl = process.env.mongoUrl_DB 

//set up mongodb connection
mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//get default connection
const db = mongoose.connection;

//define event listeners for database connection
db.on('connected',()=>{
    console.log("Database Connected Succesfully!");
})

db.on('disconnected',()=>{
    console.log("Database Disconnected");
})

db.on('error',(err)=>{
    console.log("Error Found While Connecting: " ,err);
})

//export database connection
module.exports = db;