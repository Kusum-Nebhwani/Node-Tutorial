const mongoose = require("mongoose");

//define person schema
const personSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    age:{
        type: Number,
        required : true
    },
    work: {
        type : String,
        enum : ["engineer","doctor","Designer"],
        required : true
    },
    Id: {
        type: Number,
        required : true,
        Unique : true
    }
});

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;