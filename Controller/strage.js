import passport from "passport";
import mongoose from "mongoose";
import User from "../Model/user";


const strage = passport.Strategy;


passport.use(new strage({
    email: 'user[email]',
    password: 'user[password]'
}), async (email, password, done) => {
    await User.findOne({ email: email })
        .then((user) => {
            if(!user || !user.validPass(password)){
                return done(null, false,  {errors: {'email or password': 'is invalid'}})
            }

            return done(user);
        })
        .catch(done)
});

