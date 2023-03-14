import mongoose from "mongoose";

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
    id: {
        type:Number,
        unique:true
    }
})

export const productModel = mongoose.model(productCollection,productSchema)