let produtos = [];
let carrinho = [];

async function carregarProdutosDaAPI() {
  try {
    // 🚨 ATENÇÃO: Se a sua rota no Java não for "/produtos", mude aqui embaixo (ex: "/tenis", "/api/calcados")
    const urlDaSuaAPI = "https://calcados-api.onrender.com/api/produtos";

    const resposta = await fetch(urlDaSuaAPI);
    produtos = await resposta.json();

    carregarVitrine();
  } catch (erro) {
    console.error("Erro ao buscar a API:", erro);
    document.getElementById("vitrine-produtos").innerHTML =
      "<p>Erro ao carregar a vitrine. O servidor está online?</p>";
  }
}

function carregarVitrine() {
  const vitrine = document.getElementById("vitrine-produtos");
  vitrine.innerHTML = "";

  produtos.forEach((produto) => {
    // 🚨 ATENÇÃO 2: Aqui os nomes (produto.nome, produto.preco) TÊM que ser
    // exatamente iguais aos nomes das variáveis que você criou na sua classe Java!
    vitrine.innerHTML += `
            <div class="card-produto">
                <img src="${produto.imagem || "https://via.placeholder.com/200"}" alt="${produto.nome}" width="200">
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            </div>
        `;
  });
}

function adicionarAoCarrinho(idProduto) {
  const produtoEscolhido = produtos.find((p) => p.id === idProduto);
  carrinho.push(produtoEscolhido);
  atualizarCarrinhoHTML();
}

function atualizarCarrinhoHTML() {
  let valorTotal = carrinho.reduce(
    (total, produto) => total + produto.preco,
    0,
  );
  document.getElementById("total-carrinho").innerText =
    `Total: R$ ${valorTotal.toFixed(2)}`;
  document.getElementById("quantidade-itens").innerText =
    `${carrinho.length} itens`;
}

carregarProdutosDaAPI();
