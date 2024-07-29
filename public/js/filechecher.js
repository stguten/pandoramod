const fileInput = document.getElementById('file');
const fileLabel = document.getElementById('labelfile');

const logoInput = document.getElementById('logo');
const logoLabel = document.getElementById('labellogo');

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop();
    
    if(fileExtension === 'zip' && ['application/zip', 'application/x-zip-compressed'].includes(fileType)){
        fileLabel.innerText = file.name;
    }else{
        fileInput.value='';
        alert("Arquivo invalido, selecione um arquivo .zip");
    }
});

logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop();
    
    if(fileExtension === 'zip' && ['application/zip', 'application/x-zip-compressed'].includes(fileType)){
       logoLabel.innerText = file.name;
    }else{        
        alert("Arquivo invalido, selecione um arquivo .zip");
    }
});