
const vitrine = document.getElementById("vitrine-produtos");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarContador() {
  document.getElementById("contador-carrinho").innerText = carrinho.length;
}


function adicionarAoCarrinho(nomeProduto) {

  carrinho.push(nomeProduto);


  localStorage.setItem("carrinho", JSON.stringify(carrinho));


  atualizarContador();
  mostrarToast(`🛒 ${nomeProduto} foi adicionado ao seu carrinho!`);
}

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
    divLista.innerHTML =
      "<p style='text-align:center; color:#888;'>Seu carrinho está vazio.</p>";
    return;
  }
  carrinho.forEach((item, index) => {
    divLista.innerHTML += `
            <div class="item-carrinho">
                <span>👟 ${item}</span>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        `;
  });
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

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1} - ${item}\n`;
  });

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
atualizarContador();
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
            ${botaoVerMais} <h2 style="color: #ff6b6b;">R$ ${produto.preco.toFixed(2)}</h2>
            <span class="badge-idade">Pezinho: ${produto.categoriaFaixaEtaria}</span>
            <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                Comprar Agora
            </button>
        </div>
    `;
  });
}


fetch("http://localhost:8080/api/produtos")
  .then((resposta) => resposta.json())
  .then((produtos) => {
    console.log("SUCESSO! Produtos carregados:", produtos);
    todosOsProdutos = produtos; 
    desenharVitrine(todosOsProdutos); 
  })
  .catch((erro) => console.error("Erro ao conectar com a API:", erro));

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
