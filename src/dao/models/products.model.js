import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const productCollection = 'products';

const productSchema = new mongoose.Schema({

    title: {
        type:String,
        unique:true
    },
    description:String,
    code:{
        type:Number,
        unique:true
    },
    status:Boolean,
        
    stock:{
        type:Number,
        unique:true
    },
    price:{
        type:Number,
        unique:true
    },
    thumbnail:String,
    carts:{
        type:Array,
        default:[]
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection,productSchema)