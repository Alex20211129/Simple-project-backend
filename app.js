import express from 'express';
import productsRouter from './Routes/productsRouter.js';
import categorytsRouter from './Routes/categorytsRouter.js';
import connectDB from './db/connectDB.js';
import dotenv from 'dotenv';
import seedRoutes from './Routes/seedRouter.js';
import authRouter from './Routes/authRouter.js';
import passport from 'passport';
import mypassport from './config/passport.js';
import adminProductsRouter from './Routes/adminProduct.js';
import emailRouter from './Routes/emailRouter.js';
import cors from 'cors'

const port =  process.env.PORT || 8080
mypassport(passport);
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use('/upload',express.static('./upload'))
app.use('/api/products', productsRouter)
app.use('/api/products/admin',passport.authenticate('jwt', {session: false}), adminProductsRouter)
app.use('/api/categories', categorytsRouter)
app.use('/api/seed' , seedRoutes)
app.use('/api/auth' , authRouter)
app.use('/api/email' , emailRouter)


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI).then(() => {
            console.log('MongoDB Connected...');
        })
        app.listen(port,console.log(`Server is running on port :${port}`))
    } catch (error) {
        console.log(error);
    }
};

start();

