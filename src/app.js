import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'


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
app.use('/',viewsRouter)


app.listen(8080,()=>console.log("Listening on 8080"))