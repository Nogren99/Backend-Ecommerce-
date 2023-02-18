import { promises } from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
    this.products = [];
  }

  async save(obj) {
    try {
      this.products = await this.getAll()
      this.products.push(obj)
      await promises.writeFile(this.ruta,JSON.stringify(this.products, null, '\t'))
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

  async deleteById(id) {
    try {
        let i=-1
        this.products = await this.getAll()
        i = this.products.findIndex(e=>e.id==id)
        if(i!=-1){
          this.products.splice(i,1)
          await promises.writeFile(this.ruta,JSON.stringify(this.products, null, '\t'))
          return true
      }else 
          return false
    } catch (error) {
        console.log(error);
        return [];
  }
  }

  async modifyById(id,obj) {
    try {
        let i=-1
        this.products = await this.getAll()
        i = this.products.findIndex(e=>e.id==id)
        if(i!=-1){
            this.products[i]=obj
            await promises.writeFile(this.ruta,JSON.stringify(this.products, null, '\t'))
            return true
        }else 
            return false
    } catch (error) {
        console.log(error)
        return false
  }
  }

  async deleteAll() {
    
  }
}