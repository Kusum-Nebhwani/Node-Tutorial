const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
    },
    username:{
        required:true,
        type: String
    },
    password:{
        required:true,
        type: String
    }
});
personSchema.pre("save", async function (next)  {
    const person = this;
    if (!person.isModified("password")) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(person.password, salt);
      person.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  });

  personSchema.methods.comparePassword = async function(userPassword){
    try{
         const isMatch = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
  }
//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;