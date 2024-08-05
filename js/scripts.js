const filmeForm = document.getElementById('filmeForm');
const nomeFilmeInput = document.getElementById('nomeFilme');
const imagemFilmeInput = document.getElementById('imagemFilme');
const nomePreview = document.getElementById('nomePreview');
const imagemPreview = document.getElementById('imagemPreview');
const listaFilmesAdicionar = document.getElementById('lista-filmes-add');


// Puxando filmes do arquivo json
fetch('../filmes.json')
    .then((response) => response.json())
    .then(response => {
        response.map((filme, index) => {
            const itemLista = document.createElement('li');
            const botao = document.createElement('button');
            botao.className = 'btn btn-primary botao-editar'
            botao.id = 'botao-editar-' + index;
            botao.value = index;
            botao.innerText = 'Editar'
            itemLista.innerHTML = 'Filme ' + (index + 1) + ' : ' + filme.nome;
            itemLista.appendChild(botao);
            listaFilmesAdicionar.appendChild(itemLista);
        })
        return response;
    }).then(response => {
        const botaoEdicao = document.getElementsByClassName('botao-editar');
        for (let index = 0; index < botaoEdicao.length; index++) {
            botaoEdicao[index].addEventListener('click',() => {
            nomeFilmeInput.value = response[index].nome;
            nomePreview.innerHTML = response[index].nome;
            imagemPreview.src = response[index].imagem;
            })
        }
    })

// Evento para exibir a pré-visualização da imagem e do nome do filme
imagemFilmeInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Mostra a imagem selecionada na pré-visualização
            imagemPreview.src = e.target.result;
        }

        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
});

// Evento para exibir o nome do filme na pré-visualização
nomeFilmeInput.addEventListener('input', function () {
    nomePreview.textContent = nomeFilmeInput.value;
});

// Evento de submissão do formulário
filmeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para um servidor

    // Aqui você pode adicionar o código para enviar os dados via AJAX, se necessário
    alert('Filme enviado: ' + nomeFilmeInput.value);

});

