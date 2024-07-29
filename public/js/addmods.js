const selectList = document.getElementById('categorias');

function loadSelector() {
    fetch("./categorias/todas-as-categorias")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (categoria of data) {
            selectList.add(new Option(categoria.descricao, categoria.id));
        }
      }).catch((error) => {
        console.error('Error:', error);
        selectList.add(new Option('Erro ao carregar categorias', '0'));
      });  
  }

document.onload = loadSelector();