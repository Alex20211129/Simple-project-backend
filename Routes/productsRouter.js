import express from 'express';
import Product from '../models/productSchema.js';

const productsRouter = express.Router();



//獲得所有產品
productsRouter.get('/', async(req, res) => {
    try {
        await Product.find({}).then(products => 
            res.status(200).send(products)        
        )
    } catch (error) {
        res.status(500).send('未知錯誤')
        console.log(error);
    }
});

//獲得該目錄產品;
productsRouter.get('/:category', async (req, res) => {
    try {
        await Product.find({ category: req.params.category }).then(products =>
        {
            if (products) {
                res.status(200).send(products);
            } else {
                res.status(404).send({message: '無此目錄'})
            }
        })
    } catch (error) {
        res.status(500).send('未知錯誤')
        console.log(error);
    }

})

//獲得該產品
productsRouter.get('/category/:id', async (req, res) => {
    try {
        await Product.findOne({ _id: req.params.id }).then(product => {
            if(product) {
                res.status(200).send(product);
            } else {
                res.status(404).send({message: '無此產品'});
            }
        })
    } catch (error) {
        res.status(500).send('未知錯誤')
        console.log(error);
    }
})




export default productsRouter;