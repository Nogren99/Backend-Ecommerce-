import {Router} from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { productModel } from '../models/products.model.js';
import ProductManager from '../ProductManager.js';


const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const productManager = new ProductManager(path.join(dirname, '../productos.json'));




router.get('/', async (req, res) =>{
    try{
        const prods =await productModel.find();
        res.setDefaultEncoding({result:'sucess',payload:users})
    }catch(error){
        console.log(error);
        res.status(500).send({error})
    }
})




/*
router.get('/', async (req, res) => {
    
    const products = await productManager.getAll();
    const limit = Number(req.query.limit);
    //para varios querys const {limit, query2,etc} = req.query
    
    let auxProd = []
    
    if (!limit)
        res.send(products);
    else{
        for(let i=0;i<=limit-1;i++)
            if(products[i]!=null)
                auxProd.push(products[i])
        console.log(auxProd)
        res.send(auxProd)
    }
})*/


router.post('/', async(req, res) =>{
    const {title,description,code,status,stock,price,thumbnail,id} = req.body

    if(!title || !description || !code || !status || !stock || !price || !thumbnail || !id){
        return res.status(400).send({error:'incomplete values'})
    }

    try{
        const result = await productModel.create({
            title,
            description,
            code,
            status,
            stock,
            price,
            thumbnail,
            id
        })
        res.send({result:'sucess',payload:result})
    }catch(error){
        console.log('post error')
        res.status(500).send({error})
    }
})


/*
router.post('/', async(req, res) => {
    const product = req.body;

    if(!product.title ) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    const producto = await productManager.save(product)

    res.send({status: 'sucess', message: 'Product created'});
});*/


router.put('/:id', async(req, res) => {

    const {id} = req.params;
    const prodToReplace = req.body;

    if(!prodToReplace.title || !prodToReplace.description || !prodToReplace.code || !prodToReplace.status || !prodToReplace.stock || !prodToReplace.price || !prodToReplace.thumbnail ){
        return res.status(400).send({error:'incomplete values'})
    }

    try{
        const result =await productModel.updateOne({_id:id},prodToReplace)
        res.send({result:'sucess',payload:result})
    }catch(error){
        console.log(error)
        res.status(500).send({error})
    }
})

/*
router.put('/:id', async(req, res) => {
    const product = req.body;
    const prodId = Number(req.params.id);
    const newProd = { id: prodId, ...product }
    if(!await productManager.modifyById(prodId,newProd)) 
        res.status(404).send({status: 'error', message: 'User not found'});
    else
        res.send({status: 'sucess', message: 'User updated'});


});*/


router.delete('/:id', async(req, res) => {

    let {id} = req.params
    try{
        const result = await productModel.deleteOne({
            _id:id
        })
        res.send({result:'sucess',payload:result})
    }catch(error){
        console.log(error)
        res.status(500).send({error})

    }
})

/*
router.delete('/:id', async(req, res) => {
    const prodId = Number(req.params.id);
     if (await productManager.deleteById(prodId)) {
        res.send({status: 'sucess', message: 'User deleted'});
    } else {
        res.status(404).send({status: 'error', message: 'User not found'});
    }
})*/



//Ruta /products/:pid tipo app.get donde llamamos al metodo getById
router.get('/:pid', async(req, res) => {
    const producto = await productManager.getById(Number(req.params.pid));
    if(!producto) 
        return res.send({error: 'El producto no existe'});
    else
        return res.send(producto);
});



//Ejmplo de async await llamado a la clase ProductMnager
router.get('/', async (req,res)=> {
    const products = await productManager.getAll();
    res.send({products});
})

export default router;
