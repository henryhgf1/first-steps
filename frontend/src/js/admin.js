const formulario = document.getElementById("form-cadastro");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const imagemUrl = document.getElementById("imagemUrl").value;
  const idade = document.getElementById("idade").value;
  const descricao = document.getElementById("descricao").value;
  const novoTenis = {
    nome: nome,
    descricao: descricao,
    categoriaFaixaEtaria: idade,
    preco: preco,
    imagemUrl: imagemUrl,
    variacoes: [
      { cor: "Padrão", tamanho: 20, preco: preco, quantidadeEstoque: 10 },
    ],
  };

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
        carregarProdutosAdmin();
      } else {
        alert("❌ Ops! O Java recusou o cadastro.");
      }
    })
    .catch((erro) => console.error("Erro na comunicação com a API:", erro));
});

const listaAdmin = document.getElementById("lista-admin-produtos");

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
        const img =
          produto.imagemUrl ||
          produto.imagem ||
          "https://via.placeholder.com/150";

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

carregarProdutosAdmin();
