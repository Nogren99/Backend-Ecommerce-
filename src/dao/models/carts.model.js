import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({


    products:{
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'products'
                }
            }
        ],
        default:[] // por si no se envia el anterior parametro
    }
})

export const cartModel = mongoose.model(cartCollection,cartSchema)