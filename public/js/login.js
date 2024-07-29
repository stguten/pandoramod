document.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.auth) { 
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', data.userProfile.nome);
        window.location.replace('/main.html');
    }else{
        alert('Usuário ou senha inválidos!');
    }

});

