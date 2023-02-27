import { Router } from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import ProductManager from '../ProductManager.js';

const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const productManager = new ProductManager(path.join(dirname, '../productos.json'));


router.get('/', async(req, res) => {

    const product = await productManager.getAll()

    res.render('realTimeProducts',{
        product : product
    });
});

router.post('/', async(req, res) => {
    const product = req.body;

    if(!product.title ) {
        return res.status(400).send({status: 'error', message: 'Incomplete valuess'});
    }

    const producto = await productManager.save(product)

    res.send({status: 'sucess', message: 'Product created'});
});

export default router;