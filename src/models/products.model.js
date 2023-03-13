import mongoose from "mongoose";

const productCollection = 'productos';

const productSchema = new mongoose.Schema({
    /*
    first:String,
    detalle:{
    type:String,
    unique:true//no hay 2 prod con el mismo detalle
    },*/

    title: String,
    description:String,
    code:Number,
    status:Boolean,
    stock:Number,
    price:Number,
    thumbnail:String,
    id: {
        type:Number,
        unique:true
    }
})

export const productModel = mongoose.model(productCollection,productSchema)