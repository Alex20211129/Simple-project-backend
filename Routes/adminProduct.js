import multer from 'multer'
import { existsSync, unlink } from 'fs';
import express from 'express';
import Product from '../models/productSchema.js';

const adminProductsRouter = express.Router();

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: store,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

adminProductsRouter.use('/', (req, res, next) => {
    console.log('adminProduct middleware');
    next();
})


//新增產品
adminProductsRouter.post('/', upload.single("image"), async (req, res) => {
    if (req.user.isAdmin) {
        const product = new Product({
            name: req.body.name,
            chname: req.body.chname,
            category: req.body.category,
            image: {
                imageURL: req.body.imageURL,
                imageOrigin: req.file ? req.file.path : ""
            },
            description: req.body.description,
        });
        try {
            await product.save();
            res.status(201).send(product);
        
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).send({ message: '無此權限' });
    }
})

adminProductsRouter.patch('/:id', upload.single("image"), async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const product = await Product.findOne({ _id: req.params.id })
            const productImage = product.image.imageOrigin;
            if(product) {
                const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    chname: req.body.chname,
                    category: req.body.category,
                    image: {
                        imageURL: req.body.imageURL ,
                        imageOrigin : req.file ? req.file.path :productImage
                    },
                    description: req.body.description,
                });            
                await updateProduct.save();
                res.status(200).send(updateProduct);
                if (req.file) {
                    if (existsSync(product.image.imageOrigin)) {
                        const imageName = product.image.imageOrigin.split('\\')[1];
                        unlink(product.image.imageOrigin, function () {
                            console.log(`已經刪除舊檔案:${imageName}`);
                        });
                    }
                }
            } else {
                res.status(404).send({message: 'Product Not Found'});
            }    
        } catch (error) {
            console.log(error);
        }
    }else {
        res.status(401).send({ message: '無此權限' });
    }
})

adminProductsRouter.delete('/:id', async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const product = await Product.findById(req.params.id);
            const productImage = product.image.imageOrigin;
            if(!product) return res.status(400).send({error:`can't find the product with ID ${req.params.id} `})
            if (existsSync(product.image.imageOrigin)) {
                const imageName = product.image.imageOrigin.split('\\')[1]
                unlink(product.image.imageOrigin, function () {
                    console.log(`已經刪除舊檔案:${imageName}`)
                })
            }
            await Product.findByIdAndDelete(req.params.id);
            //確認檔案存在後，刪除檔案
            res.status(200).send({ product });
        }
        catch (error) {
            console.log(error);
            
            //  res.status(500).send(error);
        }
    }else {
        res.status(401).send({ message: '無此權限' });
    }
});

export default adminProductsRouter