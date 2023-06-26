import express from 'express';
import Product from '../models/productSchema.js'
import data from '../data.js';
import User from '../models/userSchema.js';
const seedRoutes = express.Router();

seedRoutes.get('/', async(req, res) => {
    await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts})
});

seedRoutes.get('/user', async (req, res) => {
        await User.deleteMany({})
        const createdUsers = await User.create(data.users);
        res.send({ createdUsers })
})

export default seedRoutes;
