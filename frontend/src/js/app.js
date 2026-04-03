// 1. APRESENTAMOS A VITRINE PARA O JAVASCRIPT
const vitrine = document.getElementById("vitrine-produtos");

// --- LÓGICA DO CARRINHO ---
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarContador() {
  document.getElementById("contador-carrinho").innerText = carrinho.length;
}

// Recebe o nome e o preço para a calculadora funcionar!
function adicionarAoCarrinho(nomeProduto, precoProduto) {
  const item = { nome: nomeProduto, preco: precoProduto };
  carrinho.push(item);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
  mostrarToast(`🛒 ${nomeProduto} adicionado!`);
}

// --- CONTROLE DA JANELA FLUTUANTE (MODAL) ---
const modal = document.getElementById("modal-carrinho");

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
    divLista.innerHTML = "<p style='text-align:center; color:#888;'>Seu carrinho está vazio.</p>";
    return;
  }

  let valorTotal = 0; // A nossa calculadora!

  carrinho.forEach((item, index) => {
    valorTotal += item.preco;
    divLista.innerHTML += `
        <div class="item-carrinho">
            <span>👟 ${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        </div>
    `;
  });

  // Mostra o total a pagar no final
  divLista.innerHTML += `
    <div style="text-align: right; margin-top: 20px; font-size: 18px; color: #333; border-top: 2px dashed #eee; padding-top: 15px;">
        <strong>Total a pagar: <span style="color: #28a745;">R$ ${valorTotal.toFixed(2)}</span></strong>
    </div>
  `;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
  renderizarListaCarrinho();
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
  let telefone = "5517981881583"; // Seu número mantido aqui!
  let urlWhatsApp = `https://wa.me/${telefone}?text=${textoCodificado}`;
  window.open(urlWhatsApp, "_blank");

  carrinho = []; 
  localStorage.removeItem("carrinho"); 
  atualizarContador();
  fecharModal(); 
}

atualizarContador();

// --- MOTOR DE PESQUISA E VITRINE ---
const campoPesquisa = document.getElementById("campo-pesquisa");
let todosOsProdutos = [];

function desenharVitrine(listaParaDesenhar) {
  vitrine.innerHTML = ""; 

  if (listaParaDesenhar.length === 0) {
    vitrine.innerHTML = `
        <p style='text-align:center; width:100%; color:#888; font-size: 18px; margin-top: 50px;'>
            Nenhum tênis encontrado. 😢 Tente buscar outra cor ou modelo!
        </p>`;
    return;
  }

  listaParaDesenhar.forEach((produto) => {
    let botaoVerMais = "";
    if (produto.descricao.length > 100) {
      botaoVerMais = `<span class="btn-ver-mais" onclick="alternarDescricao('desc-${produto.id}', this)">Ver mais</span>`;
    }

    vitrine.innerHTML += `
        <div class="card-produto">
            <img src="${produto.imagemUrl}" alt="${produto.nome}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
            <h3>${produto.nome}</h3>
            <p class="descricao-produto" id="desc-${produto.id}">${produto.descricao}</p>
            ${botaoVerMais} 
            <h2 style="color: #ff6b6b;">R$ ${produto.preco.toFixed(2)}</h2>
            <span class="badge-idade">Pezinho: ${produto.categoriaFaixaEtaria}</span>
            <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                Comprar Agora
            </button>
        </div>
    `;
  });
}

// --- VERSÃO MVP (DADOS FIXOS PARA A LOJA ONLINE) ---
todosOsProdutos = [
    {
        id: 1,
        nome: "Tênis Masculino Nike Jordan Access Court Mid",
        preco: 664.99,
        imagemUrl: "https://imgcentauro-a.akamaihd.net/660x660/99756K19A2.jpg", 
        descricao: "Tênis Masculino Nike Jordan Access Court Mid: Estilo e Performance Inigualáveis!",
        categoriaFaixaEtaria: "3 a 5 anos"
    },
    {
        id: 2,
        nome: "Sandália Juvenil Crocs Bayaband Clog",
        preco: 229.00,
        imagemUrl: "https://imgcentauro-a.akamaihd.net/800x800/9972ZDKLA2.jpg",
        descricao: "A Sandália Juvenil Crocs Bayaband Clog combina o visual clássico da Crocs com um toque moderno e cheio de estilo.",
        categoriaFaixaEtaria: "3 a 5 anos"
    },
    {
        id: 3,
        nome: "Tênis Revolution 7",
        preco: 298.77,
        imagemUrl: "https://imgcentauro-a.akamaihd.net/900x900/98582814A2.jpg",
        descricao: "O Nike Revolution 7 é mais do que um tênis; é um companheiro confiável para os pequenos atletas em cada fase de crescimento.",
        categoriaFaixaEtaria: "3 a 5 anos"
    }
];

// Desenha a vitrine logo que a página abre!
desenharVitrine(todosOsProdutos);

campoPesquisa.addEventListener("input", function () {
  const termoPesquisado = campoPesquisa.value.toLowerCase();
  const produtosFiltrados = todosOsProdutos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(termoPesquisado) ||
      produto.descricao.toLowerCase().includes(termoPesquisado) ||
      produto.categoriaFaixaEtaria.toLowerCase().includes(termoPesquisado)
    );
  });
  desenharVitrine(produtosFiltrados);
});

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
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
