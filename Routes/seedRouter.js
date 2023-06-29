import express from 'express';
import Product from '../models/productSchema.js'
import data from '../data.js';
import User from '../models/userSchema.js';
const seedRoutes = express.Router();

//重置產品 Reset products
seedRoutes.get('/', async(req, res) => {
    await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.status(200).send({ message: '產品重置成功', Products:createdProducts})
});

//重置使用者 Reset users
seedRoutes.get('/user', async (req, res) => {
    await User.deleteMany({})
    const createdUsers = await User.create(data.users);
    res.status(200).send({ message: '使用者重置成功', Users:createdUsers})
})

export default seedRoutes;
