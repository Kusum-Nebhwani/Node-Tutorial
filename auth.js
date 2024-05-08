const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/Person');


passport.use(new LocalStrategy(async(Username,password,done)=>{
    try{
        console.log("Received Credentials: ",Username,password);
        const user = await person.findOne({username: Username});
        if(!user){
            return done(null,false,{message : "Incorrect Username"});
        }

        const isPasswordMatch = user.password === password ? true:false;
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message : "Incorrect Password"});
        }

    }catch(err){
          return done(err);
    }
}))

module.exports = passport;