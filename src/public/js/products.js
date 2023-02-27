const socket = io();

socket.emit('message', 'Hola :) estoy usando sockets desde el cliente');//message identificador del evento al que envio mensaje


const input = document.getElementById('textbox');

const log = document.getElementById('log');

input.addEventListener('keyup', evt => {
    if (evt.key==="Enter"){
        socket.emit('productMessage', input.value);
        input.value="";
    }
});

socket.on('log', data => {
    let logs = '';
    data.logs.forEach(log => {
        logs += `Producto: ${log.producto}<br/>`
    });
    log.innerHTML=logs;
});