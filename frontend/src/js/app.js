// 1. APRESENTAMOS A VITRINE PARA O JAVASCRIPT (Era isso que estava faltando!)
const vitrine = document.getElementById("vitrine-produtos");

// --- LÓGICA DO CARRINHO ---
// Tenta pegar o carrinho salvo na memória, se não tiver, cria uma lista vazia []
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Função que atualiza o numerozinho vermelho na tela
function atualizarContador() {
  document.getElementById("contador-carrinho").innerText = carrinho.length;
}

// Função que é chamada quando clica no botão comprar
function adicionarAoCarrinho(nomeProduto) {
  // Adiciona o produto na lista
  carrinho.push(nomeProduto);

  // O SEGREDO: Salva a lista atualizada no HD do navegador (localStorage)
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza o visual
  atualizarContador();
  alert(`🛒 ${nomeProduto} foi adicionado ao seu carrinho!`);
}

// Já chama a função de cara para mostrar o número certo ao carregar a página
atualizarContador();
// 2. Dizemos ao Front-end: "Vá lá no nosso servidor Java e traga a lista de calçados"
fetch("http://localhost:8080/api/produtos")
  .then((resposta) => resposta.json()) // Transforma a resposta da internet em JSON
  .then((produtos) => {
    console.log("SUCESSO! Olha o que veio do Java:", produtos);

    // Limpamos a vitrine para não duplicar se a página atualizar
    vitrine.innerHTML = "";

    // O SEGREDO ESTÁ AQUI: O forEach!
    // Ele vai passar por cada 'produto' dentro da lista de 'produtos'
    produtos.forEach((produto) => {
      vitrine.innerHTML += `
                <div class="card-produto">
                    <img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <h2 style="color: #ff6b6b;">R$ ${produto.preco.toFixed(2)}</h2>
                    <span class="badge-idade">Pezinho: ${produto.categoriaFaixaEtaria}</span>
                    
                    <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}')">
    Comprar Agora
</button>
                </div>
            `;
    });
  })
  .catch((erro) => console.error("Erro ao conectar com a API:", erro));
