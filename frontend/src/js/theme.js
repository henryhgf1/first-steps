const opcoesTema = document.querySelectorAll(".config-opcao");
const avisoTema = document.getElementById("aviso-tema");

const mediaQuerySistema = window.matchMedia("(prefers-color-scheme: dark)");

function obterPreferenciaSalva() {
  const salva = localStorage.getItem("tema");
  return salva === "claro" || salva === "escuro" ? salva : "auto";
}

function aplicarTema(preferencia) {
  const temaEfetivo =
    preferencia === "auto"
      ? mediaQuerySistema.matches
        ? "escuro"
        : "claro"
      : preferencia;

  document.documentElement.setAttribute("data-theme", temaEfetivo);
}

function marcarOpcaoAtiva(preferencia) {
  opcoesTema.forEach((botao) =>
    botao.classList.toggle("ativa", botao.dataset.tema === preferencia),
  );
}

function definirPreferencia(preferencia) {
  if (preferencia === "auto") {
    localStorage.removeItem("tema");
  } else {
    localStorage.setItem("tema", preferencia);
  }

  aplicarTema(preferencia);
  marcarOpcaoAtiva(preferencia);

  if (avisoTema) {
    avisoTema.style.display = "block";
    setTimeout(() => {
      avisoTema.style.display = "none";
    }, 2000);
  }
}

opcoesTema.forEach((botao) =>
  botao.addEventListener("click", () =>
    definirPreferencia(botao.dataset.tema),
  ),
);

// No modo automático, acompanha mudanças do sistema em tempo real
mediaQuerySistema.addEventListener("change", () => {
  if (obterPreferenciaSalva() === "auto") aplicarTema("auto");
});

marcarOpcaoAtiva(obterPreferenciaSalva());
