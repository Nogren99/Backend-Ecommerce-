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



/*

const users = []
const food = [
    {name: 'Pizza', price: 10.12},
    {name: 'Banana', price: 9.12},
    {name: 'Soda', price: 8.12},
    {name: 'Ensalada', price: 7.12},
    {name: 'Sandia', price: 15.12},
    {name: 'Sandia', price: 15.12},
]

router.get('/', (req, res) => {
    console.log('k')

    
     const testUser = {
         name: 'Alex',
         lastName: 'Garcia',
         role: 'admin'
     };

     res.render('index', {
         user: testUser,
         //isAdmin: testUser.role === 'admin',
         //style: 'index.css',
         food
     });
    //const random = Math.floor(Math.random()*users.length);
    
    //res.render('users', users[random]);
    //res.render('register');
});
*/

