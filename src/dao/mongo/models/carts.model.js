import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({


    products: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      }],
})

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(cartCollection,cartSchema)