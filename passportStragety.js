import passport from "passport";
import passportjwt from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();


const strag = passportjwt.Strategy;
const extractJwt = passportjwt.ExtractJwt;

export const passportStragety = () => {
    passport.use(new strag({
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: process.env.JWT_TOKEN
    }, (payload, done) => {
        try {
            console.log(payload);
        } catch (err) {
            console.log(err);
            done(false, err);
        }
    }))
}