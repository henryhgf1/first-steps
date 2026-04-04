// Pegamos o formulário
const formulario = document.getElementById("form-cadastro");

// Dizemos: "Quando o formulário for enviado (submit), execute essa função"
formulario.addEventListener("submit", function (event) {
  // Isso impede a página de piscar/recarregar quando clica no botão
  event.preventDefault();

  // 1. Pegamos os valores que o gerente digitou na tela
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const imagemUrl = document.getElementById("imagemUrl").value;
  const idade = document.getElementById("idade").value;
  const descricao = document.getElementById("descricao").value;

  // 2. Montamos o "pacote" JSON
  const novoTenis = {
    nome: nome,
    descricao: descricao,
    categoriaFaixaEtaria: idade,
    preco: preco,
    imagemUrl: imagemUrl,
    variacoes: [
      // Colocamos uma variação padrão só para o Java não dar erro
      { cor: "Padrão", tamanho: 20, preco: preco, quantidadeEstoque: 10 },
    ],
  };

  // 3. 🚀 Enviamos o pacote para o Java no Render via POST
  fetch("https://calcados-api.onrender.com/api/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoTenis), 
  })
    .then((resposta) => {
      if (resposta.ok) {
        alert("✅ Tênis cadastrado com sucesso no Banco de Dados!");
        formulario.reset(); 
        carregarProdutosAdmin(); // Atualiza a lista na hora!
      } else {
        alert("❌ Ops! O Java recusou o cadastro.");
      }
    })
    .catch((erro) => console.error("Erro na comunicação com a API:", erro));
});

// --- LÓGICA DO DASHBOARD (ESTOQUE ATUAL) ---
const listaAdmin = document.getElementById("lista-admin-produtos");

// 1. 🚀 Função que vai no Java do Render e traz todos os produtos
function carregarProdutosAdmin() {
  fetch("https://calcados-api.onrender.com/api/produtos")
    .then((resposta) => resposta.json())
    .then((produtos) => {
      listaAdmin.innerHTML = ""; 

      if (produtos.length === 0) {
        listaAdmin.innerHTML =
          '<p style="text-align:center;">Nenhum produto cadastrado no banco de dados.</p>';
        return;
      }

      produtos.forEach((produto) => {
        // Tratamento rápido para a imagem não quebrar
        const img = produto.imagemUrl || produto.imagem || "https://via.placeholder.com/150";

        listaAdmin.innerHTML += `
                <div class="admin-item-produto">
                    <div class="admin-item-info">
                        <img src="${img}" alt="${produto.nome}" width="80">
                        <div>
                            <strong style="color:#333; font-size:18px;">${produto.nome}</strong><br>
                            <span style="color:#888;">R$ ${produto.preco.toFixed(2)} | Pezinho: ${produto.categoriaFaixaEtaria}</span>
                        </div>
                    </div>
                    <button class="btn-excluir-admin" onclick="excluirProduto(${produto.id})">🗑️ Excluir</button>
                </div>
            `;
      });
    })
    .catch((erro) => console.error("Erro ao carregar produtos:", erro));
}

// 2. 🚀 A MÁGICA DE APAGAR DO BANCO DE DADOS (DELETE) NO RENDER
function excluirProduto(idProduto) {
  if (
    confirm(
      "🚨 Tem certeza que deseja excluir este tênis permanentemente do Banco de Dados?",
    )
  ) {
    fetch(`https://calcados-api.onrender.com/api/produtos/${idProduto}`, {
      method: "DELETE",
    })
      .then((resposta) => {
        if (resposta.ok) {
          alert("✅ Produto excluído com sucesso!");
          carregarProdutosAdmin(); 
        } else {
          alert("❌ Erro ao excluir o produto. O Java não deixou.");
        }
      })
      .catch((erro) => console.error("Erro na exclusão:", erro));
  }
}

// Executa a função logo de cara para ver o que tem no banco
carregarProdutosAdmin();