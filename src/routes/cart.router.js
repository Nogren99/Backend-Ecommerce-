import {Router} from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import CartManager from '../CartManager.js';

const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const cartManager = new CartManager(path.join(dirname, '../cart.json'));

router.get('/', async (req, res) => {
    
    const products = await cartManager.getAll();

    res.send(products)

})

router.get('/:cid', async(req, res) => {
    const producto = await cartManager.getById(Number(req.params.cid));
    console.log(req.params.cid)
    if(!producto) 
        return res.send({error: 'El producto no existe'});
    else
        return res.send(producto);
});

router.post('/', async(req, res) => {
    const cartProd = req.body;

    if(!cartProd.cart ) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    await cartManager.save(cartProd)

    res.send({status: 'sucess', message: 'Product created'});
});


router.post('/:cid/product/:pid', async(req, res) => {
    //const cartId= req.body;
    console.log(req.params.cid)
    console.log(req.params.pid)

    const cid = req.params.cid
    const pid = req.params.pid
    //console.log(prodId)

    if(!cid || !pid ) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    await cartManager.saveById(cid,pid)

    res.send({status: 'sucess', message: 'Product created'});
});

export default router;