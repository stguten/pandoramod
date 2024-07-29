const nomeUsuarioInput = document.getElementById('nomeUsuario');
const emailUsuarioInput = document.getElementById('emailUsuario');
const senhaUsuarioInput = document.getElementById('senhaUsuario');
const confirmarSenhaUsuarioInput = document.getElementById('confirmacaoSenhaUsuario');

document.onsubmit = async function(e){
    e.preventDefault();
    const username = nomeUsuarioInput.value;
    const email = emailUsuarioInput.value;
    const password = (senhaUsuarioInput.value === confirmarSenhaUsuarioInput.value ? senhaUsuarioInput.value : alert('As senhas não coincidem!')); 

    console.log(username, email, password);
    
    const response = await fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if(data.error){
        alert(data.error);
    } else {
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '/index.html';
    }
}