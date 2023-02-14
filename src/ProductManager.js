import { promises } from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(obj) {
    
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
    
  }

  async deleteAll() {
    
  }
}