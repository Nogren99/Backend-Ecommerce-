const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    //fetch para consumir el servicio del backend
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        } 
      })
      .then(result => {
        if(result.status === 200) {
          window.location.replace('/');
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