const formulario = document.getElementById("form-cadastro");
const listaAdmin = document.getElementById("lista-admin-produtos");
const campoEdicaoId = document.getElementById("produtoEdicaoId");
const tituloForm = document.getElementById("titulo-form");
const btnCancelar = document.getElementById("btn-cancelar-edicao");
const btnSalvarTexto = document.getElementById("btn-salvar-texto");

const API_URL = "https://calcados-api.onrender.com/api/produtos";

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const imagemUrl = document.getElementById("imagemUrl").value;
  const descricao = document.getElementById("descricao").value;
  const estilo = document.getElementById("estilo").value;
  const edicaoId = campoEdicaoId.value;

  const dados = {
    nome,
    descricao,
    estilo,
    preco,
    imagemUrl,
    variacoes: [
      { cor: "Padrão", tamanho: 20, preco: preco, quantidadeEstoque: 10 },
    ],
  };

  const isEdicao = edicaoId !== "";
  const url = isEdicao ? `${API_URL}/${edicaoId}` : API_URL;
  const method = isEdicao ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then((resposta) => {
      if (resposta.ok) {
        alert(
          isEdicao
            ? "✅ Produto atualizado com sucesso!"
            : "✅ Tênis cadastrado com sucesso!",
        );
        formulario.reset();
        campoEdicaoId.value = "";
        resetarFormulario();
        carregarProdutosAdmin();
      } else {
        alert("❌ Ops! O Java recusou o cadastro.");
      }
    })
    .catch((erro) => console.error("Erro na comunicação com a API:", erro));
});

function resetarFormulario() {
  tituloForm.textContent = "Cadastrar Novo Tênis";
  btnCancelar.style.display = "none";
  btnSalvarTexto.textContent = "Salvar Produto no Banco";
}

function prepararEdicao(produto) {
  document.getElementById("nome").value = produto.nome;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("imagemUrl").value = produto.imagemUrl || "";
  document.getElementById("descricao").value = produto.descricao || "";
  document.getElementById("estilo").value = produto.estilo || "";
  campoEdicaoId.value = produto.id;

  tituloForm.textContent = "Editando Produto";
  btnCancelar.style.display = "block";
  btnSalvarTexto.textContent = "Atualizar Produto";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelarEdicao() {
  formulario.reset();
  campoEdicaoId.value = "";
  resetarFormulario();
}

function carregarProdutosAdmin() {
  fetch(API_URL)
    .then((resposta) => {
      if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
      return resposta.json();
    })
    .then((produtos) => {
      listaAdmin.innerHTML = "";

      if (produtos.length === 0) {
        listaAdmin.innerHTML =
          '<p style="text-align:center;">Nenhum produto cadastrado no banco de dados.</p>';
        return;
      }

      const html = produtos
        .map((produto) => {
          const img =
            produto.imagemUrl ||
            produto.imagem ||
            "https://via.placeholder.com/150";
          const preco = produto.preco ?? 0;
          const estiloBadge = produto.estilo
            ? `<span class="badge-estilo">${produto.estilo}</span>`
            : "";

          return `
          <div class="admin-item-produto">
            <div class="admin-item-info">
              <img src="${img}" alt="${produto.nome}">
              <div>
                <strong>${produto.nome}</strong>
                <span>R$ ${preco.toFixed(2)}</span>
                ${estiloBadge}
              </div>
            </div>
            <div class="admin-acoes">
              <button class="btn-editar-admin" onclick='prepararEdicao(${JSON.stringify(produto)})'>✏️ Editar</button>
              <button class="btn-excluir-admin" onclick="excluirProduto(${produto.id})">🗑️ Excluir</button>
            </div>
          </div>`;
        })
        .join("");

      listaAdmin.innerHTML = html;
    })
    .catch((erro) => console.error("Erro ao carregar produtos:", erro));
}

function excluirProduto(idProduto) {
  if (
    confirm("🚨 Tem certeza que deseja excluir este tênis permanentemente?")
  ) {
    fetch(`${API_URL}/${idProduto}`, { method: "DELETE" })
      .then((resposta) => {
        if (resposta.ok) {
          alert("✅ Produto excluído com sucesso!");
          if (campoEdicaoId.value == idProduto) cancelarEdicao();
          carregarProdutosAdmin();
        } else {
          alert("❌ Erro ao excluir o produto.");
        }
      })
      .catch((erro) => console.error("Erro na exclusão:", erro));
  }
}

carregarProdutosAdmin();
