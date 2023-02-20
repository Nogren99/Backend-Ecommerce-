import { promises } from 'fs';

export default class ProductManager {

    constructor(ruta) {
        this.ruta = ruta;
        this.carts = [];
    }

    async save(obj) {
        try {
            this.carts = await this.getAll()
            this.carts.push(obj)
            await promises.writeFile(this.ruta,JSON.stringify(this.carts, null, '\t'))
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async saveById(cid,pid) {
        try {
            this.carts = await this.getAll()
            console.log(this.carts)
            //Devuelve -1 si no existe, y en caso contrario la posición que será mayor o igual que 0.
            if(this.carts.indexOf(cid) == -1){ //si no existe en el carrito
                //console.log(this.carts.indexOf(cid))
                //console.log(this.carts[cid-1])

                let id=-1
                if (this.carts.length === 0) {
                    id = 1;
                } else {
                    id = this.carts[this.carts.length - 1].id + 1;
                }

                const product={
                    id : pid,
                    amount : 1
                }


                const cart = {
                    id: id,
                    products: []
                  }
                cart.id=id
                cart.products.push(product)
                this.carts.push(cart)
            }else{ // si existe en el carrito
                this.carts[this.carts.indexOf(cid)].products.amount++
            }
            await promises.writeFile(this.ruta,JSON.stringify(this.carts, null, '\t'))
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            var prod = products[id-1]
            //console.log(prod)
            return prod
        } catch (error) {
            console.log(error);
            return [];
        }
      }

    async getAll() {
        try {
            const products = await promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.log(error);
            return [];
        }
      }


}