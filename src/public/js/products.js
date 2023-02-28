
//const productManager = new ProductManager(path.join(dirname, '../productos.json'));
const socket = io();

socket.emit('message', 'Hola :) estoy usando sockets desde el cliente');//message identificador del evento al que envio mensaje


const input = document.getElementById('form');

const log = document.getElementById('log');

input.addEventListener('submit', evt => {
    console.log("s")
    evt.preventDefault()
    const title = document.getElementById('Producto').value
    console.log(title)
    const desc= document.getElementById('Descripcion').value
    const code = document.getElementById('code').value
    const state = document.getElementById('Estado').value
    const stock = document.getElementById('Stock').value
    const price = document.getElementById('Price').value

    const prod ={
        title: title,
        description:desc,
        code:code,
        status:state,
        stock:stock,
        price:price,
    }

    //productManager.save(prod)

    socket.emit('productMessage', prod);
    input.value="";
});

socket.on('log', data => {

    //log.innerHTML="Producto:"+data.title;
    console.log(data)

    let logs = '';
    data.logs.forEach(log => {
        logs += `Producto: ${log.title} <br/><br/>Descripcion: ${log.description} <br/><br/>code: ${log.code} <br/><br/>Estado: ${log.status} <br/><br/>Stock: ${log.stock} <br/><br/>Price: ${log.price} <br/><br/><br/>`
    });
    log.innerHTML=logs;
});