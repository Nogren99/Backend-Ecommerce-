import {Router} from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import CartManager from '../CartManager.js';
import carts from '../dao/dbManagers/carts.js';
import { cartModel } from '../dao/models/carts.model.js';


const cartManager = new carts();
const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
//const cartManager = new CartManager(path.join(dirname, '../cart.json'));

router.get('/', async (req, res) => {
    try{
        const carts = await cartManager.getAll();
        res.send({status:'sucess',payload: carts});
    }catch(error){
        res.status(500).send({error});
    }
})

router.get('/:cid', async(req, res) => {
    const producto = await cartManager.getById(Number(req.params.cid));
    console.log(req.params.cid)
    if(!producto) 
        return res.send({error: 'El producto no existe'});
    else
        return res.send(producto);
});

router.post('/', async(req, res) =>{
    const {products} = req.body
    try{
        const result = await cartManager.save({
            products
        })
        res.send({result:'sucess',payload:result})
    }catch(error){
        console.log('post error')
        res.status(500).send({error})
    }
})



//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado. 
router.delete('/:cid/products/:pid', async(req,res)=>{

    const { cid, pid } = req.params;
    console.log('3')
    try {

      const { docs: [cart] } = await cartModel.paginate({ _id: cid }, {limit:10 , page:1});
  
      // Eliminao el objeto del arreglo de productos correspondiente al pid
      cart.products = cart.products.filter((product) => product.product.toString() !== pid);
  
      // Guardao el carrito actualizado en la base de datos
      await cart.save();
  
      res.send({status:'sucess',payload: cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al intentar eliminar el producto del carrito.' });
      }

})



//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', async (req, res) => {

    const {cid} = req.params
    const{prods} = req.body

    try {
        const cart = await cartModel.findOne({ _id: cid });
        console.log(cart)
        cart.products.push(prods) // AGREGA UN PRODUCTO, NO SE SI DEBERIA BORRAR LOS EXISTENTES
        await cart.save()
        res.send({status:'sucess',payload: cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al intentar eliminar el producto del carrito.' });
    }
})




//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        const cart = await cartModel.findById(cid);
        const cartProduct = cart.products.find(p => p.product.toString() === pid);
    
        console.log(cartProduct)
        console.log(quantity)
        cartProduct.quantity = quantity;
    
        await cart.save();
    
        res.send({ status: 'success', payload: cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al intentar actualizar la cantidad del producto.' });
      }
})

/*
router.post('/', async(req, res) => {
    const cartProd = req.body;

    if(!cartProd.cart ) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    await cartManager.save(cartProd)

    res.send({status: 'sucess', message: 'Product created'});
});*/


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