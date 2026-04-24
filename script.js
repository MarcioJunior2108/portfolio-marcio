const formContato = document.getElementById("formContato");
const mensagemStatus = document.createElement("p");
const secoesParaRevelar = document.querySelectorAll("section, .card, .timeline-item");
const fotoPerfil = document.getElementById("foto-perfil");
const fotoPlaceholder = document.getElementById("foto-placeholder");

mensagemStatus.id = "mensagem-status";
formContato.appendChild(mensagemStatus);

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

function sincronizarFoto() {
  if (!fotoPerfil) {
    return;
  }

  if (fotoPerfil.getAttribute("src")) {
    fotoPerfil.hidden = false;
    fotoPlaceholder.hidden = true;
  }
}

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

revelarElementos();
sincronizarFoto();
