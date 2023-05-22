import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import __dirname from './utils.js';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import productsRouter from './routes/products.router.js';
import config from "./config.js";
import { addLogger } from './utils/logger.js';

const app = express();

try {
    await mongoose.connect('mongodb+srv://nogren23:Zvfs1X97w9j42Hny@cluster0.tw7ltq8.mongodb.net/test?retryWrites=true&w=majority');
} catch (error) {
    console.log(error);   
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(session({

    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}));

//Configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products',productsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/auth', sessionsRouter);

app.use(addLogger);
app.get('/loggerTest', (req, res) => {
  //Loguear a nivel consola
  // req.logger.error('Prueba error');
  // req.logger.warn('Prueba warn');
  // req.logger.info('Prueba info');
  // req.logger.debug('Prueba debug');
  // req.logger.silly('Prueba silly');

  //Mensajes niveles custom
  req.logger.fatal('Prueba fatal');
  req.logger.error('Prueba error');
  req.logger.warning('Prueba warning');
  req.logger.info('Prueba info');
  req.logger.http('Prueba http');
  req.logger.debug('Prueba debug');
  
  res.send({ message: 'Prueba logger' });
});

//app.listen(8080);

app.listen(Number(config.port), () => console.log(`Server running on port ${config.port}`))





















/*

import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import realTimeRouter from './routes/realTime.router.js'
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';
import path from 'path'
import { cartModel } from './dao/models/carts.model.js';
import { productModel } from './dao/models/products.model.js';
import sessionsRouter from './routes/sessions.router.js'
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';


const app = express();


app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  }));
app.set('views',`${__dirname}/views`);//especificamos el directorio donde estan nuestras vistas
app.set('view engine','handlebars')
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);
app.use('/realtimeproducts',realTimeRouter)
app.use('/',viewsRouter)
app.use('/api/sessions', sessionsRouter);




mongoose.connect('mongodb+srv://nogren23:Zvfs1X97w9j42Hny@cluster0.tw7ltq8.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection successful');
}).catch((error) => {
  console.log('Error connecting to database:', error.message);
});


app.use(session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://nogren23:Zvfs1X97w9j42Hny@cluster0.tw7ltq8.mongodb.net/test?retryWrites=true&w=majority',
      ttl: 3600
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true,
  }));


//Configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


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


*/


/*
    //await cartModel.create({})
    await productModel.create({
        title: 'Camisa',
        description: 'azul',
        code: 13,
        status: true,
        stock: 11,
        price: 8000.45,
        thumbnail: "-",
    })


    // BUSCO CARRITO, LE AGREGO UN PRODUCTO Y LO ACTUALIZO
    //const cart = await cartModel.findOne({_id:'6419373beb87c29d5ca9857c'})
    //cart.products.push({product:'640fd97c3ad3eac894edc1da'})
    //const result = await cartModel.updateOne({_id:'6419373beb87c29d5ca9857c'},cart)
    //console.log(result)
    //const response = await cartModel.find()
    //console.log(JSON.stringify(response, null,'\t'))
    

    //const response = await cartModel.find().populate('products.product')
    //console.log(JSON.stringify(response, null,'\t'))


    //PAGINATE

    //const productsA = await productModel.paginate({status:true},{limit:5 , page:1})
    //console.log(JSON.stringify(productsA,null,'\t'))


*/