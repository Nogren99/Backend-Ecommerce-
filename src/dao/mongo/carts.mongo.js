import { cartModel } from "./models/carts.model.js";

export default class Carts {

    constructor(){
        console.log('const cart funcionando mongoDB')
  
    }
    getAll = async() => {
        const carts = await cartModel.find()
        //mapeo y convierto a js
        return carts.map(cart => cart.toObject());
    }

    save = async ( cart) =>{
        const result = await cartModel.create(cart);
        return result;
    }


}