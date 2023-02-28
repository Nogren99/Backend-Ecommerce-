import {Router} from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import ProductManager from '../ProductManager.js';

const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const productManager = new ProductManager(path.join(dirname, '../productos.json'));


router.get('/', async(req, res) => {
    console.log('k')

    const product = await productManager.getAll()

    res.render('index',{
        
        product : product
    });
});


export default router



