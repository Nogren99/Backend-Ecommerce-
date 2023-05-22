import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
        }
    ],
    role:String
});

export const userModel = mongoose.model(userCollection, userSchema);

