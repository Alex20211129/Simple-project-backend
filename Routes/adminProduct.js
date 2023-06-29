import multer from 'multer'
import { existsSync, unlink } from 'fs';
import express from 'express';
import Product from '../models/productSchema.js';

const adminProductsRouter = express.Router();

//set file save address and filename
const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

//set file save limit and type only jpeg or png 
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


//post new product /新增產品
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
            res.status(500).send({ message: '伺服器錯誤，請重新操作' })
            console.log(error);
        }
    } else {
       return res.status(401).send({ message: '無此權限' });
    }
})

//update a product /更新產品
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
                return res.status(404).send({message: '找不到此產品'});
            }    
        } catch (error) {
            res.status(500).send({ message: '修改產品失敗' })
            console.log(error);
        }
    }else {
       return res.status(401).send({ message: '無此權限' });
    }
})

//delete a product /刪除產品
adminProductsRouter.delete('/:id', async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const product = await Product.findById(req.params.id);
            if(!product) return res.status(404).send({error:`無法找到此產品 ID ${req.params.id} `})
            if (existsSync(product.image.imageOrigin)) {
                const imageName = product.image.imageOrigin.split('\\')[1]
                unlink(product.image.imageOrigin, function () {
                    console.log(`已經刪除舊檔案:${imageName}`)
                })
            }
            await Product.findByIdAndDelete(req.params.id);
            //確認檔案存在後，刪除檔案
            res.status(200).send({ message:"成功刪除檔案" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: '刪除產品失敗' })
        }
    }else {
       return res.status(401).send({ message: '無此權限' });
    }
});

export default adminProductsRouter