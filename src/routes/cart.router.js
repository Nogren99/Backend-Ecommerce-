import {Router} from 'express';
import { getCarts , getCartbyId , postCart , deleteCart , putCart , putCartByProduct , postCartByProduct } from '../controllers/carts.controller';

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartbyId);
router.post('/', postCart)

//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado. 
router.delete('/:cid/products/:pid', deleteCart)

//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', putCart)

//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', putCartByProduct)

router.post('/:cid/product/:pid', postCartByProduct);

export default router;