import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer", required: true }
});

userSchema.methods.isAdmin = function () {
    return this.role == "admin";
};

userSchema.pre('save', async function (next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next()
})

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default mongoose.model('User', userSchema);