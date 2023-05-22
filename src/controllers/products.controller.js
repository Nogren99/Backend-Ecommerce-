import { productModel } from '../dao/mongo/models/products.model.js';
import Products from '../dao/mongo/products.mongo.js'
const productManager = new Products();

const getProducts =async (req, res) =>{
    let { limit, page, sort , query } = req.query;
    let price=0

    try{
        if(!limit){limit=10}
        if(!page){page=1}
        //console.log(limit+" "+ page)
        
        if(sort=='desc'){
            price=-1
        }else if (sort=='asc'){
            price=1
        }

        let products = await productModel.paginate({status:true},
            {limit: limit,
            page: page,
            sort : {price: price}
        })
        res.render('products', { products });
    }catch(error){
        console.log(error);
        res.status(500).send({error})
    }
}

const postProduct= async(req, res) =>{
    const {title,description,code,status,stock,price,thumbnail} = req.body

    if(!title || !description || !code || !status || !stock || !price || !thumbnail){
        return res.status(400).send({error:'incomplete values'})
    }

    try{
        const result = await productManager.save({
            title,
            description,
            code,
            status,
            stock,
            price,
            thumbnail
        })
        res.send({result:'success',payload:result})
    }catch(error){
        console.log('post error')
        res.status(500).send({error})
    }
}

const putProduct =async(req, res) => {

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
}

const deleteProduct = async(req, res) => {

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
}

export {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}