import { productModel } from "./models/products.model.js";

export default class Products {

    constructor(){
        console.log('const prod funcionando mongoDB')
    }
    getAll = async() => {
        const prods = await productModel.find();
        //mapeo y convierto a js
        return prods.map(prod => prod.toObject());
    }

    save = async (prod) =>{
        const result = await productModel.create(prod);
        return result;
    }
}