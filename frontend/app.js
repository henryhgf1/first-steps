// Dizemos ao Front-end: "Vá lá no nosso servidor Java e traga a lista de calçados"
fetch('http://localhost:8080/api/produtos')
    .then(resposta => resposta.json()) // Transforma a resposta da internet em JSON
    .then(produtos => {
        console.log("SUCESSO! Olha o que veio do Java:", produtos);
        
        const vitrine = document.getElementById('vitrine-produtos');
        
        // Para cada produto que veio do banco de dados, criamos um pedaço de HTML na tela
        produtos.forEach(produto => {
            vitrine.innerHTML += `
                <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px;">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p><strong>Idade:</strong> ${produto.categoriaFaixaEtaria}</p>
                </div>
            `;
        });
    })
    .catch(erro => console.error("Erro ao conectar com a API:", erro));