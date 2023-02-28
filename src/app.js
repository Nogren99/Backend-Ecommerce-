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



const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);//especificamos el directorio donde estan nuestras vistas
app.set('view engine','handlebars')

app.use(express.static(`${__dirname}/public`))

/*
app.get('/',(req,res)=>{
    let testUser={
        name:"jime tqm :)",
        lastName:"testLN"
    }
    res.render('index',testUser)
})*/

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);
app.use('/realtimeproducts',realTimeRouter)
app.use('/',viewsRouter)


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

