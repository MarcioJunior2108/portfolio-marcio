const formContato = document.getElementById("formContato");
const mensagemStatus = document.createElement("p");
const secoesParaRevelar = document.querySelectorAll("section, .card, .timeline-item");
const linksMenu = document.querySelectorAll("nav a");
const menuNavegacao = document.getElementById("menuNavegacao");
const menuBotao = document.getElementById("menuBotao");
const temaBotao = document.getElementById("temaBotao");
const fotoPerfil = document.getElementById("foto-perfil");
const fotoPlaceholder = document.getElementById("foto-placeholder");

mensagemStatus.id = "mensagem-status";
formContato.appendChild(mensagemStatus);

// Validação simples exigida pela atividade para o campo de e-mail.
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Anima a entrada das seções para deixar a navegação mais agradável.
function revelarElementos() {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  secoesParaRevelar.forEach((elemento) => {
    elemento.classList.add("revelar");
    observador.observe(elemento);
  });
}

// Exibe a foto do perfil quando o arquivo estiver configurado corretamente.
function sincronizarFoto() {
  if (!fotoPerfil || !fotoPlaceholder) {
    return;
  }

  if (fotoPerfil.getAttribute("src")) {
    fotoPerfil.hidden = false;
    fotoPlaceholder.hidden = true;
  }
}

// Mostra no menu qual seção está ativa durante a rolagem.
function ativarLinkAtual() {
  const posicaoAtual = window.scrollY + 140;

  linksMenu.forEach((link) => {
    const secao = document.querySelector(link.getAttribute("href"));

    if (!secao) {
      return;
    }

    const inicio = secao.offsetTop;
    const fim = inicio + secao.offsetHeight;
    const estaAtiva = posicaoAtual >= inicio && posicaoAtual < fim;

    link.classList.toggle("ativo", estaAtiva);
  });
}

// Menu responsivo sugerido no enunciado para melhorar a navegação em telas menores.
function alternarMenu() {
  const aberto = menuNavegacao.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
}

// Alterna entre tema escuro e claro e salva a preferência do usuário.
function alternarTema() {
  document.body.classList.toggle("tema-claro");
  const temaAtual = document.body.classList.contains("tema-claro") ? "claro" : "escuro";
  localStorage.setItem("tema-portifolio", temaAtual);
}

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema-portifolio");

  if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
  }
}

menuBotao.addEventListener("click", alternarMenu);
temaBotao.addEventListener("click", alternarTema);

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menuNavegacao.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  });
});

// Simula o envio do formulário depois da validação, como pedido na atividade.
formContato.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    mensagemStatus.textContent = "Por favor, preencha todos os campos.";
    mensagemStatus.className = "erro";
    return;
  }

  if (!emailValido(email)) {
    mensagemStatus.textContent = "Por favor, informe um e-mail válido.";
    mensagemStatus.className = "erro";
    return;
  }

  mensagemStatus.textContent = "Mensagem enviada com sucesso!";
  mensagemStatus.className = "sucesso";
  formContato.reset();
});

window.addEventListener("scroll", ativarLinkAtual);

aplicarTemaSalvo();
revelarElementos();
sincronizarFoto();
ativarLinkAtual();
