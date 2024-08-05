const fileInput = document.getElementById('fileInput');
const foto = document.getElementById("fotu");

// Adiciona um evento de clique à imagem para abrir o explorador de arquivos
foto.addEventListener('click', function() {
    fileInput.click();
});

// Adiciona um evento para quando o arquivo for selecionado
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Substitui a imagem existente com a nova imagem selecionada
            foto.src = e.target.result;
        }

        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
});