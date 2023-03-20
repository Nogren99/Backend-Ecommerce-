import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import realTimeRouter from './routes/realTime.router.js'
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';
import path from 'path'
import mongoose from 'mongoose';
import { cartModel } from './dao/models/carts.model.js';
import { productModel } from './dao/models/products.model.js';





const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);//especificamos el directorio donde estan nuestras vistas
app.set('view engine','handlebars')

app.use(express.static(`${__dirname}/public`))



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);
app.use('/realtimeproducts',realTimeRouter)
app.use('/',productsRouter)
try{
    await mongoose.connect('mongodb+srv://nogren23:Zvfs1X97w9j42Hny@cluster0.tw7ltq8.mongodb.net/?retryWrites=true&w=majority')
    //await cartModel.create({})
    /*await productModel.create({
        title: 'Camisa',
        description: 'azul',
        code: 13,
        status: true,
        stock: 11,
        price: 8000.45,
        thumbnail: "-",
    })*/


    /* BUSCO CARRITO, LE AGREGO UN PRODUCTO Y LO ACTUALIZO
    const cart = await cartModel.findOne({_id:'6416620572b88a56f02c9cdf'})
    cart.products.push({product:'64166287fe5a3f23287346dc'})
    const result = await cartModel.updateOne({_id:'6416620572b88a56f02c9cdf'},cart)
    console.log(result)
    //const response = await cartModel.find()
    //console.log(JSON.stringify(response, null,'\t'))
    */

    const response = await cartModel.find().populate('products.product')
    //console.log(JSON.stringify(response, null,'\t'))


    //PAGINATE

    const productsA = await productModel.paginate({status:true},{limit:5 , page:1})
    //console.log(JSON.stringify(productsA,null,'\t'))

}catch(error){
    console.log('error database')
}


const server = app.listen(8080,()=>console.log("Listening on 8080"))

const io = new Server(server)

const logs = [];
io.on('connection', socket => {
    console.log('Connected');
    const productManager = new ProductManager(path.join(__dirname, './productos.json'));
    socket.on('productMessage', async(data) => {
        //console.log(data)
        await productManager.save(data)
        //let prods = await productManager.getAll()
        //console.log(prods)
        logs.push(data);
        console.log(logs.length)
        io.emit('log', {logs});
    })
});

app.set('socketio',io);

