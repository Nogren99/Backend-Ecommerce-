import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const productCollection = 'products';

const productSchema = new mongoose.Schema({

    title:String,
    description:String,
    code:Number,
    status:Boolean,
    stock:Number,
    price:Number,
    thumbnail:String,
    carts:{
        type:Array,
        default:[]
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection,productSchema)