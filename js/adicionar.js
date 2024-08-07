const filmeForm = document.getElementById('filmeForm');
const nomeFilmeInput = document.getElementById('nomeFilme');
const imagemFilmeInput = document.getElementById('imagemFilme');
const nomePreview = document.getElementById('nomePreview');
const imagemPreview = document.getElementById('imagemPreview');
const listaFilmesAdicionar = document.getElementById('lista-filmes-add');
const faixaEtariaForm = document.getElementById('faixa-etaria-form')
let filmeIdEdicao;
let listaFilmesAtual = [];

createEditMovieList = (filme, index) => {
    const itemLista = document.createElement('li');
    const botao = document.createElement('button');
    botao.className = 'btn btn-primary botao-editar'
    itemLista.className = 'list-group-item d-flex justify-content-between'
    botao.id = 'botao-editar-' + index;
    botao.value = index;
    botao.innerText = 'Editar'
    itemLista.innerHTML = '<span><b>Filme ' + (index + 1) + ':</b> ' + filme.nome + '</span>';
    itemLista.appendChild(botao);
    listaFilmesAdicionar.appendChild(itemLista);
}

// Puxando filmes do arquivo json
fetch('../filmes.json')
    .then((response) => response.json())
    .then(response => {
        listaFilmesAtual = response;
        response.map((filme, index) => {
            createEditMovieList(filme, index);
        })
        return response;
    }).then(response => {
        const botaoEdicao = document.getElementsByClassName('botao-editar');
        for (let index = 0; index < botaoEdicao.length; index++) {
            botaoEdicao[index].addEventListener('click', () => {
                nomeFilmeInput.value = response[index].nome;
                nomePreview.innerHTML = response[index].nome;
                imagemPreview.src = response[index].imagem;
                filmeIdEdicao = response[index].id;
            })
        }
        console.log(response);
        return response;
    })




// Evento para exibir a pré-visualização da imagem
imagemFilmeInput.addEventListener('change', function (event) {
    const url = imagemFilmeInput.value;
    if (url) {
        imagemPreview.src = url;
    } else {
        imagemPreview.src = '';
    }
});

// Evento para exibir o nome do filme na pré-visualização
nomeFilmeInput.addEventListener('input', function () {
    nomePreview.textContent = nomeFilmeInput.value;
});

// Evento de submissão do formulário
filmeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para um servidor
    let filmeString = '{"nome": "' + nomeFilmeInput.value + '", "faixaEtaria": "' + faixaEtariaForm.value + '", "imagem": "' + imagemFilmeInput.value + '"}';
    const listaAntigaFilmes = listaFilmesAtual;

    console.log(listaAntigaFilmes);

    const listaAtualizadaFilmes = listaAntigaFilmes.map((filme) => {
        if (filme.id == filmeIdEdicao) {
            return ({
                ...filme, nome: nomeFilmeInput.value,
                faixaEtaria: faixaEtariaForm.value,
                imagem: imagemFilmeInput.value
            })
        }
        return filme;
    });

    fetch('/editar', {
        method: 'PUT',
        body: JSON.stringify(listaAtualizadaFilmes),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))

    alert('Filme enviado: ' + nomeFilmeInput.value);

});