const vitrine = document.getElementById("vitrine-produtos");
const campoPesquisa = document.getElementById("campo-pesquisa");
const modal = document.getElementById("modal-carrinho");
let todosOsProdutos = [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

async function carregarProdutosDaAPI() {
  try {
    const urlDaSuaAPI = "https://calcados-api.onrender.com/api/produtos";
    const resposta = await fetch(urlDaSuaAPI);
    todosOsProdutos = await resposta.json();

    desenharVitrine(todosOsProdutos);
  } catch (erro) {
    console.error("Erro ao buscar a API:", erro);
    vitrine.innerHTML =
      "<p style='text-align:center; color:#888;'>Erro ao carregar a vitrine. O servidor está online?</p>";
  }
}

function desenharVitrine(listaParaDesenhar) {
  vitrine.innerHTML = "";

  if (listaParaDesenhar.length === 0) {
    vitrine.innerHTML = `
        <p style='text-align:center; width:100%; color:#888; font-size: 18px; margin-top: 50px;'>
            Nenhum tênis encontrado. 😢
        </p>`;
    return;
  }

  listaParaDesenhar.forEach((produto) => {
    const imagem =
      produto.imagem || produto.imagemUrl || "https://via.placeholder.com/200";
    const desc = produto.descricao || "";
    const idade = produto.categoriaFaixaEtaria || "Infantil";

    let botaoVerMais = "";
    if (desc.length > 100) {
      botaoVerMais = `<span class="btn-ver-mais" onclick="alternarDescricao('desc-${produto.id}', this)">Ver mais</span>`;
    }

    vitrine.innerHTML += `
        <div class="card-produto">
            <img src="${imagem}" alt="${produto.nome}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
            <h3>${produto.nome}</h3>
            <p class="descricao-produto" id="desc-${produto.id}">${desc}</p>
            ${botaoVerMais} 
            <h2 style="color: #ff6b6b;">R$ ${produto.preco.toFixed(2)}</h2>
            <span class="badge-idade">Pezinho: ${idade}</span>
            <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                Comprar Agora
            </button>
        </div>
    `;
  });
}

if (campoPesquisa) {
  campoPesquisa.addEventListener("input", function () {
    const termoPesquisado = campoPesquisa.value.toLowerCase();
    const produtosFiltrados = todosOsProdutos.filter((produto) => {
      const nome = produto.nome ? produto.nome.toLowerCase() : "";
      const desc = produto.descricao ? produto.descricao.toLowerCase() : "";
      return nome.includes(termoPesquisado) || desc.includes(termoPesquisado);
    });
    desenharVitrine(produtosFiltrados);
  });
}

function adicionarAoCarrinho(nomeProduto, precoProduto) {
  const item = { nome: nomeProduto, preco: precoProduto };
  carrinho.push(item);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
  mostrarToast(`🛒 ${nomeProduto} adicionado!`);
}

function atualizarContador() {
  const qtdItens = document.getElementById("contador-carrinho");
  if (qtdItens) {
    qtdItens.innerText = carrinho.length;
  }
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
  renderizarListaCarrinho();
}

function abrirModal() {
  modal.classList.remove("modal-escondido");
  modal.classList.add("modal-visivel");
  renderizarListaCarrinho();
}

function fecharModal() {
  modal.classList.remove("modal-visivel");
  modal.classList.add("modal-escondido");
}

function renderizarListaCarrinho() {
  const divLista = document.getElementById("lista-itens-carrinho");
  divLista.innerHTML = "";

  if (carrinho.length === 0) {
    divLista.innerHTML =
      "<p style='text-align:center; color:#888;'>Seu carrinho está vazio.</p>";
    return;
  }

  let valorTotal = 0;
  carrinho.forEach((item, index) => {
    valorTotal += item.preco;
    divLista.innerHTML += `
        <div class="item-carrinho">
            <span>👟 ${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        </div>
    `;
  });

  divLista.innerHTML += `
    <div style="text-align: right; margin-top: 20px; font-size: 18px; color: #333; border-top: 2px dashed #eee; padding-top: 15px;">
        <strong>Total a pagar: <span style="color: #28a745;">R$ ${valorTotal.toFixed(2)}</span></strong>
    </div>
  `;
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione alguns tênis primeiro. 👟");
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar a compra dos seguintes itens:\n\n";
  let valorTotal = 0;

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1} - ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    valorTotal += item.preco;
  });

  mensagem += `\n*Total do Pedido: R$ ${valorTotal.toFixed(2)}*\n`;
  mensagem += "\nAguardo o retorno para calcular o frete e o pagamento!";

  let textoCodificado = encodeURIComponent(mensagem);
  let telefone = "5511921355678";
  let urlWhatsApp = `https://wa.me/${telefone}?text=${textoCodificado}`;
  window.open(urlWhatsApp, "_blank");

  carrinho = [];
  localStorage.removeItem("carrinho");
  atualizarContador();
  fecharModal();
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = mensagem;
  toast.classList.remove("toast-escondido");
  toast.classList.add("toast-visivel");

  setTimeout(() => {
    toast.classList.remove("toast-visivel");
    toast.classList.add("toast-escondido");
  }, 3000);
}

function alternarDescricao(idDescricao, botao) {
  const paragrafo = document.getElementById(idDescricao);
  paragrafo.classList.toggle("expandida");
  if (paragrafo.classList.contains("expandida")) {
    botao.innerText = "Ver menos";
  } else {
    botao.innerText = "Ver mais";
  }
}

atualizarContador();
carregarProdutosDaAPI();
