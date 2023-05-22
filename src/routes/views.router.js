import {Router} from 'express';
import Prods from '../dao/mongo/products.mongo.js'
import Carts from '../dao/mongo/carts.mongo.js'

const productManager = new Prods();
const cartManager = new Carts();
const router = Router();

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

export default router



