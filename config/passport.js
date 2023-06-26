import jwtStrategy from 'passport-jwt';
import extractJwt from 'passport-jwt';
import User from '../models/userSchema.js'

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = extractJwt.ExtractJwt;

const mypassport = (passport) => {
    let options = {};
    
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = process.env.TOKEN_SECRET;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
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