import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import User from '../models/userSchema.js';
import jsonwebtoken from 'jsonwebtoken';

const authRouter = express.Router();

//login /登入
authRouter.post('/login', async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }).then((user) => {
            if (!user) return res.status(401).send({message:"email not found"});
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) return res.status(400).send(err);
                if (!isMatch) return res.status(401).send({message:"Invalid Password"});
                const tokenObj = { _id: user._id, name: user.name,role:user.role };
                const token = jsonwebtoken.sign(tokenObj, process.env.secretOrKey,{expiresIn:'1h'});
                res.status(200).send({ success: true, token: "JWT " + token, user:{name:user.name,role:user.role} });
            });
        })
    } catch (error) {
        res.status(500).send({ message: "未知錯誤" })
        console.log(err)
    }
})



//register /註冊
authRouter.post('/register', async (req, res) => {
    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) return res.status(400).send({ message: "信箱已被註冊過" })
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then((user) => {
            const tokenObj = { _id: user._id, name: user.name, role: user.role };
            const token = jsonwebtoken.sign(tokenObj, process.env.secretOrKey, { expiresIn: '1h' });
            res.status(200).send({ success: true, token: "JWT " + token, user: { name: user.name, role: user.role } });
        })
    }catch (error) {
        res.status(400).send(error);
        console.log(error)
    };
})
export default authRouter;
