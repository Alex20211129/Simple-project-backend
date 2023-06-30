import jwtStrategy from 'passport-jwt';
import User from '../models/userSchema.js';
import dotenv from 'dotenv';
dotenv.config()

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = jwtStrategy.ExtractJwt;

const mypassport = (passport) => {
    let Jwtoptions = {};
    Jwtoptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    Jwtoptions.secretOrKey = process.env.secretOrKey;
    passport.use(new JwtStrategy(Jwtoptions, (jwt_payload, done) => {
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