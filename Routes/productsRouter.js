import express from 'express';
import Product from '../models/productSchema.js';

const productsRouter = express.Router();



//獲得所有產品
productsRouter.get('/', async(req, res) => {
    const products = await Product.find({})
    res.status(200).send(products);
});


productsRouter.get('/:category', async(req, res) => {
    const products = await Product.find({category: req.params.category})
    if(products) {
        res.status(200).send(products);
    } else {
        res.status(404).send({message: '無此目錄'});
    }

})

//獲得某產品
productsRouter.get('/category/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})
        if(product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({message: '無此產品'});
        }
        
    } catch (error) {
        res.status(500).send('未知錯誤')
        console.log(error);
    }
})




export default productsRouter;