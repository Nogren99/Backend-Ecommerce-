import {Router} from 'express';
import { getProducts , postProduct , putProduct , deleteProduct } from '../controllers/products.controller.js';

const router = Router();

router.get('/', getProducts)
router.post('/', postProduct)
router.put('/:id', putProduct)
router.delete('/:id', deleteProduct)

export default router;



