import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path'
import { fileURLToPath } from 'url';



const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));

//Traemos todos los productos y mostramos dependiendo del limit
app.get('/products', async (req, res) => {
    
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



//Ruta /products/:pid tipo app.get donde llamamos al metodo getById
app.get('/products/:pid', async(req, res) => {
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