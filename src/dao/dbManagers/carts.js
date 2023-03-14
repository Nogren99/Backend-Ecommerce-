import { cartModel } from "../models/carts.model.js";

export default class Carts {

    constructor(){
        console.log('const cart funcionando mongoDB')
  
    }
    getAll = async() => {
        const carts = await cartModel.find();
        //mapeo y convierto a js
        return carts.map(cart => cart.toObject());
    }

    saveUser = async ( cart) =>{
        const result = await cartModel.create(cart);
        return result;
    }

    update = async ( id,course) =>{
        const result = await coursesModel.updateOne({_id:id},course);
        return result
    }
}