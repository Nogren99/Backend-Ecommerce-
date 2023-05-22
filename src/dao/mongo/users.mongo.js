import { userModel } from "./models/users.model.js";

export default class Products {

    constructor(){
        console.log('const user funcionando mongoDB')
    }
    getAll = async() => {
        const users = await userModel.find();
        //mapeo y convierto a js
        return users.map(user => user.toObject());
    }

    save = async (user) =>{
        const result = await userModel.create(user);
        return result;
    }
}