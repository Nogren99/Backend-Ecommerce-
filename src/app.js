import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path'
import { fileURLToPath } from 'url';



const app = express();

//soporte para trabajar con json
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));


//app.get('/api/carts',{}) 

//Traemos todos los productos y mostramos dependiendo del limit
app.get('/api/products', async (req, res) => {
    
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
})

app.post('/api/products', async(req, res) => {
    // {
    //     first_name: 'Alex',
    //     last_name: 'Pinaida',
    //     user_name: 'ap'
    // }
    const product = req.body;
    console.log(req.body)
    console.log("dddddddddd")
    console.log(product)

    if(!product.title ) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    const producto = await productManager.save(product)

    res.send({status: 'sucess', message: 'Product created'});
});


app.put('/api/products/:id', async(req, res) => {
    const product = req.body;
    const prodId = Number(req.params.id);

    const newProd = { id: prodId, ...product }

    

    if(!await productManager.modifyById(prodId,newProd)) 
        res.status(404).send({status: 'error', message: 'User not found'});
    else
        res.send({status: 'sucess', message: 'User updated'});

    /*

    if(!product.title) {
        return res.status(400).send({status: 'error', message: 'Incomplete values'});
    }

    const newProd = { id: prodId, ...product }

    console.log(newProd)

    const producto = await productManager.getById(Number(prodId));

    console.log(producto)

    if(!producto) 
        res.status(404).send({status: 'error', message: 'User not found'});
    else
        res.send({status: 'sucess', message: 'User updated'});

*/

});

app.delete('/api/products/:id', async(req, res) => {
    const prodId = Number(req.params.id);
     if (await productManager.deleteById(prodId)) {
        
        res.send({status: 'sucess', message: 'User deleted'});
    } else {
        res.status(404).send({status: 'error', message: 'User not found'});
    }
})



//Ruta /products/:pid tipo app.get donde llamamos al metodo getById
app.get('/api/products/:pid', async(req, res) => {
    const producto = await productManager.getById(Number(req.params.pid));

    if(!producto) 
        return res.send({error: 'El producto no existe'});
    else
        return res.send(producto);
});



//Ejmplo de async await llamado a la clase ProductMnager
app.get('/', async (req,res)=> {
    const products = await productManager.getAll();
    res.send({products});
})




app.listen(8080,()=>console.log("Listening on 8080"))