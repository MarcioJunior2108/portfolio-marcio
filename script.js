// Seleciona o formulário de contato pelo ID
const formContato = document.getElementById("formContato");

// Cria uma mensagem visual para mostrar sucesso ou erro
const mensagemStatus = document.createElement("p");
mensagemStatus.id = "mensagem-status";
formContato.appendChild(mensagemStatus);

// Função para validar formato básico de e-mail
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Evento de envio do formulário
formContato.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Verifica se todos os campos foram preenchidos
  if (nome === "" || email === "" || mensagem === "") {
    mensagemStatus.textContent = "Por favor, preencha todos os campos.";
    mensagemStatus.className = "erro";
    return;
  }

  // Verifica se o e-mail possui formato válido
  if (!emailValido(email)) {
    mensagemStatus.textContent = "Por favor, informe um e-mail válido.";
    mensagemStatus.className = "erro";
    return;
  }

  // Simulação de envio conforme solicitado na atividade
  mensagemStatus.textContent = "Mensagem enviada com sucesso!";
  mensagemStatus.className = "sucesso";

  // Limpa os campos após envio
  formContato.reset();
});