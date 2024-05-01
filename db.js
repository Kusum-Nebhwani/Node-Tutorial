const mongoose = require('mongoose'); 


//define the mongodb connection url
const mongoUrl = 'mongodb://localhost:27017/mydb'

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