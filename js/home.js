const moviePosters = document.getElementsByClassName('movie-poster');

createMoviePosters = (filme, index) => {
    const cardFilme = document.createElement('div');
    cardFilme.classList = 'card h-100';
    const faixaEtaria = document.createElement('div');
    faixaEtaria.classList= 'badge bg-dark text-white position-absolute';
    const poster = document.createElement('img');
    poster.classList = 'card-img-top';
    poster.id = 'imagemFilme';
    poster.src = filme.imagem;
    const divBody = document.createElement('div');
    divBody.classList = 'card-body p-4';
    divBody.innerHTML = '<div class="text-center"><h5 class="fw-bolder">' + filme.nome + '</h5></div>';
    const nota = document.createElement('div');
    nota.classList = 'd-flex justify-content-center small text-warning mb-2';
    nota.innerHTML = '<span><b>Nota ImDB: </b>' + filme.nota + '</span>';
    moviePosters[index].appendChild(cardFilme);
    cardFilme.appendChild(faixaEtaria);
    cardFilme.appendChild(poster);
    cardFilme.appendChild(divBody);
    divBody.appendChild(nota);
    const botaoComprar = document.createElement('div');
    botaoComprar.classList = 'card-footer p-4 pt-0 border-top-0 bg-transparent';
    botaoComprar.innerHTML = '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Reservar</a></div>'
    divBody.appendChild(botaoComprar);

}

// Puxando filmes do arquivo json
fetch('../filmes.json')
    .then((response) => response.json())
    .then(response => {
        response.map((filme, index) => {
            createMoviePosters(filme, index);
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