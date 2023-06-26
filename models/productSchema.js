import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chname:{type:String,required:true},
    category: { type: String, required: true },
    image: {
        imageURL: { type: String },
        imageOrigin:{type:String},
    },
    description: { type: String },
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);
export default Product