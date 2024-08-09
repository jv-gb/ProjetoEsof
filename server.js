const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar o middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Rota para adicionar filmes
app.put('/editar', (req, res) => {
    const newFilm = req.body;

    fs.writeFile('./filmes.json', JSON.stringify(newFilm), (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar o arquivo');
        }
        res.send({ message: 'Filme adicionado com sucesso' });
    });
});


// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'principal/index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});
