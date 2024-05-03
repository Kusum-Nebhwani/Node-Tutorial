const mongoose = require('mongoose'); 


//define the mongodb connection url
//const mongoUrl = 'mongodb://localhost:27017/mydb'  ----> Local Database Url
const mongoUrl = 'mongodb+srv://kusum-nebhwani:Kusum123@cluster0.2n0uiaw.mongodb.net/'

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