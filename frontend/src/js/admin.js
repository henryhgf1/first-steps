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

  // 2. Montamos o "pacote" JSON (Idêntico ao que fazíamos no Insomnia!)
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

  // 3. Enviamos o pacote para o Java via POST
  fetch("http://localhost:8080/api/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Avisamos que estamos mandando JSON
    },
    body: JSON.stringify(novoTenis), // Transforma o pacote em texto para a internet
  })
    .then((resposta) => {
      if (resposta.ok) {
        alert("✅ Tênis cadastrado com sucesso no Banco de Dados!");
        formulario.reset(); // Limpa os campos para o próximo cadastro
      } else {
        alert("❌ Ops! O Java recusou o cadastro.");
      }
    })
    .catch((erro) => console.error("Erro na comunicação com a API:", erro));
});
