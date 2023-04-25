import { cartModel } from '../dao/models/carts.model.js';
import carts from '../dao/dbManagers/carts.js';

const cartManager = new carts();

const getCarts = async (req, res) => {
    try{
        const carts = await cartManager.getAll();
        res.send({status:'sucess',payload: carts});
    }catch(error){
        res.status(500).send({error});
    }
}


const getCartbyId = async(req, res) => {
    const producto = await cartManager.getById(Number(req.params.cid));
    console.log(req.params.cid)
    if(!producto) 
        return res.send({error: 'El producto no existe'});
    else
        return res.send(producto);
}

const postCart =async(req, res) =>{
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
}

const deleteCart = async(req,res)=>{

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

}

const putCart = async (req, res) => {

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
}

const putCartByProduct = async (req, res) => {

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
}

const postCartByProduct = async(req, res) => {
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
}

export {
    getCarts,
    getCartbyId,
    postCart,
    deleteCart,
    putCart,
    putCartByProduct,
    postCartByProduct
}