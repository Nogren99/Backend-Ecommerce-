import {Router} from 'express';
import Prods from '../dao/dbManagers/products.js'
import Carts from '../dao/dbManagers/carts.js'
//import path from 'path'
//import { fileURLToPath } from 'url';
//import ProductManager from '../ProductManager.js';

const productManager = new Prods();
const cartManager = new Carts();
const router = Router();

//const filename = fileURLToPath(import.meta.url);
//const dirname = path.dirname(filename);

//const productManager = new ProductManager(path.join(dirname, '../productos.json'));

const publicAccess = (req, res, next) => {
    //if (req.session.user) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {
    //if (!req.session.user) return res.redirect('/login');
    next();
}

router.get('/githublogin', publicAccess, (req, res) => {
    res.render('githublogin');
});

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});

router.get('/reset', publicAccess, (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {
    res.redirect('/login');
});

/*
router.get('/', async(req, res) => {
    const products = await productManager.getAll()
    console.log(products)
    res.render('products', { products });
    //res.render('index',{product : product});
});


router.get('/cart', async(req, res) => {
    console.log('k')

    const carts = await cartManager.getAll()
    res.render('prods',{carts});
    //res.render('index',{product : product});
});
*/

export default router



