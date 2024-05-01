const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    dish_name:{
         type:String,
         required : true
    },
    Price: {
        type: Number,
        required :true
    },
    NoOfOrder:{
        type: Number,
        required : true
    },
    Quantity:{
        type: Number,
        required: true
    },
    cuisine:{
        type:String,
        enum : ["Indian","Chinese","Italian","Mexican"],
        required : true
    },
    Id:{
        type: Number,
        required : true
    },
    included:{
        type:[String],
        default : "water"
    }
        

    })

    

    const Menu = mongoose.model('Menu',MenuSchema);
    module.exports = Menu;