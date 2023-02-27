const socket = io();

socket.emit('message', 'Hola estoy usando sockets desde el cliente');//message identificador del evento al que envio mensaje

