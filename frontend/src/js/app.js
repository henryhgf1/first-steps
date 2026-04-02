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
  mostrarToast(`🛒 ${nomeProduto} foi adicionado ao seu carrinho!`);
}
// --- CONTROLE DA JANELA FLUTUANTE (MODAL) ---
const modal = document.getElementById("modal-carrinho");

function abrirModal() {
  modal.classList.remove("modal-escondido");
  modal.classList.add("modal-visivel");
  renderizarListaCarrinho(); // Desenha os itens sempre que abrir
}

function fecharModal() {
  modal.classList.remove("modal-visivel");
  modal.classList.add("modal-escondido");
}

// Pega a lista do carrinho e desenha na tela
function renderizarListaCarrinho() {
  const divLista = document.getElementById("lista-itens-carrinho");
  divLista.innerHTML = ""; // Limpa a janela antes de desenhar

  if (carrinho.length === 0) {
    divLista.innerHTML =
      "<p style='text-align:center; color:#888;'>Seu carrinho está vazio.</p>";
    return;
  }

  // O ForEach desenha um por um, e coloca o botão "Remover" do lado!
  carrinho.forEach((item, index) => {
    divLista.innerHTML += `
            <div class="item-carrinho">
                <span>👟 ${item}</span>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        `;
  });
}

// A mágica de deletar um item (Letra D do CRUD)
function removerItem(index) {
  // O comando "splice" é a tesoura do JavaScript. Ele corta 1 item daquela posição
  carrinho.splice(index, 1);

  // Salva a lista nova no navegador
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza tudo!
  atualizarContador();
  renderizarListaCarrinho();
}
// Função para enviar o pedido pro WhatsApp
function finalizarCompra() {
  // 1. Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione alguns tênis primeiro. 👟");
    return; // Para a função aqui e não abre o Zap
  }

  // 2. Monta a mensagem bonitinha
  let mensagem = "Olá! Gostaria de finalizar a compra dos seguintes itens:\n\n";

  // Passa por cada item do carrinho e adiciona na mensagem
  carrinho.forEach((item, index) => {
    mensagem += `${index + 1} - ${item}\n`;
  });

  mensagem += "\nAguardo o retorno para calcular o frete e o pagamento!";

  // 3. Prepara a mensagem para a Internet (troca espaços por %20, pula linha, etc)
  let textoCodificado = encodeURIComponent(mensagem);

  // 4. Coloque o SEU número aqui (55 + DDD + Número)
  let telefone = "5517981881583";

  // 5. Cria o link mágico do WhatsApp e abre em uma nova aba
  let urlWhatsApp = `https://wa.me/${telefone}?text=${textoCodificado}`;
  window.open(urlWhatsApp, "_blank");

  carrinho = []; // 1. Esvazia a lista na memória do JavaScript
  localStorage.removeItem("carrinho"); // 2. Apaga o carrinho salvo no navegador
  atualizarContador();

  fecharModal(); // 4. Esconde a janela do carrinho automaticamente!
}
// Já chama a função de cara para mostrar o número certo ao carregar a página
atualizarContador();
// 2. Dizemos ao Front-end: "Vá lá no nosso servidor Java e traga a lista de calçados"
// --- MOTOR DE PESQUISA E VITRINE ---
const campoPesquisa = document.getElementById("campo-pesquisa");

// Variável global para guardar TODOS os produtos que vierem do Banco de Dados
let todosOsProdutos = [];

// Criamos uma função separada que só tem um trabalho: Desenhar Tênis na tela!
function desenharVitrine(listaParaDesenhar) {
  vitrine.innerHTML = ""; // Limpa a vitrine antes de desenhar

  // Se a pesquisa não achar nada, avisa o cliente
  if (listaParaDesenhar.length === 0) {
    vitrine.innerHTML = `
        <p style='text-align:center; width:100%; color:#888; font-size: 18px; margin-top: 50px;'>
            Nenhum tênis encontrado. 😢 Tente buscar outra cor ou modelo!
        </p>`;
    return;
  }

  // O ForEach desenha os cards da lista que passarmos para ele
  listaParaDesenhar.forEach((produto) => {
    // 🧠 INTELIGÊNCIA: Só cria o botão "Ver mais" se a descrição for grande
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

// 1. Buscamos do Java (Executa apenas UMA vez ao abrir a página)
fetch("http://localhost:8080/api/produtos")
  .then((resposta) => resposta.json())
  .then((produtos) => {
    console.log("SUCESSO! Produtos carregados:", produtos);
    todosOsProdutos = produtos; // Guardamos a "cópia oficial" na memória
    desenharVitrine(todosOsProdutos); // Desenha a vitrine completa inicialmente
  })
  .catch((erro) => console.error("Erro ao conectar com a API:", erro));

// 2. A MÁGICA DA PESQUISA! Ouve cada letra que o cliente digita
campoPesquisa.addEventListener("input", function () {
  const termoPesquisado = campoPesquisa.value.toLowerCase();

  // Filtramos a lista oficial baseada no que foi digitado
  const produtosFiltrados = todosOsProdutos.filter((produto) => {
    return (
      produto.nome.toLowerCase().includes(termoPesquisado) ||
      produto.descricao.toLowerCase().includes(termoPesquisado) ||
      produto.categoriaFaixaEtaria.toLowerCase().includes(termoPesquisado)
    );
  });

  // Pedimos para a vitrine se redesenhar apenas com os filtrados
  desenharVitrine(produtosFiltrados);
});

// --- NOTIFICAÇÃO TOAST ---
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

// --- FUNÇÃO VER MAIS / VER MENOS ---
function alternarDescricao(idDescricao, botao) {
  // Pega o parágrafo exato que o cliente clicou
  const paragrafo = document.getElementById(idDescricao);

  // O 'toggle' liga a classe se estiver desligada, e desliga se estiver ligada
  paragrafo.classList.toggle("expandida");

  // Muda o textinho do botão para fazer sentido
  if (paragrafo.classList.contains("expandida")) {
    botao.innerText = "Ver menos";
  } else {
    botao.innerText = "Ver mais";
  }
}
