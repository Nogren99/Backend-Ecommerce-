const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/login', {
       method: 'POST',
       body: JSON.stringify(obj),
       headers: {
        'Content-Type': 'application/json'
       } 
    }).then(result => {
        if(result.status === 200) {
            window.location.replace('/api/products');
        }
    })
    .catch(error => {
        console.log(error);
        // Muestra el error en la página
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error registering user.';
        form.appendChild(errorMessage);
      });
});