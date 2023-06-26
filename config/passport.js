import jwtStrategy from 'passport-jwt';
import extractJwt from 'passport-jwt';
import User from '../models/userSchema.js'
import dotenv from 'dotenv';
dotenv.config()

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = extractJwt.ExtractJwt;

const mypassport = (passport) => {
    let jwtoptions = {};
    
    jwtoptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    jwtoptions.secretOrKey = process.env.secretOrKey;
    passport.use(new JwtStrategy(jwtoptions, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }).then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch((err) => {
            if (err) return done(err, false);
        })
    }));
};    

export default mypassport;