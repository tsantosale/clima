const botoesDeHumor = document.querySelectorAll(".emojiBtn");
let humorSelecionado = "";

// Define a função para atualizar a cidade na URL da API
function buscarClima() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;//Utilizando o vite para proteger o conteúdo da chave
  let cidade = document.getElementById("cidade").value;//.value é que permite acessar o valor digitado
  let urlAtualizada = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(urlAtualizada)
    .then(response => response.json())
    .then(data => {
      let temp = data.main.temp;
      let weather = data.weather[0].description;
      let icone = data.weather[0].icon;
      let urlIcone = `https://openweathermap.org/img/wn/${icone}@2x.png`;
      const clima = document.getElementById("resultadoClima");
      clima.hidden = false;
      clima.innerHTML = `
                <img src="${urlIcone}" alt="${weather}">
                <p>Temperatura: ${temp}°C</p>
                <p>Clima: ${weather}</p>
            `;
      let weatherMain = data.weather[0].main.toLowerCase();
      mostrarSugestaoClima(weatherMain);
    })
    .catch(error => console.log('Erro:', error));

}
//Função com as dicas de ayurveda de acordo com o clima
function mostrarSugestaoClima(clima) {
  const sugestao = document.getElementById("sugestaoClima");
  sugestao.hidden = false;

  if (clima.includes("rain")) {
    sugestao.innerHTML = "<p>Dia chuvoso? Que tal um chá de gengibre ou de oregáno que vão auxiliar na digestão?</p>";
  } else if (clima.includes("clear")) {
    sugestao.innerHTML = "<p>Com sol forte, prefira alimentos refrescantes como pepino, melancia e chá de hortelã em temperatura ambiente.</p>";
  } else if (clima.includes("clouds")) {
    sugestao.innerHTML = "<p>Dia nublado? Uma comida mais aconchegante como arroz com dhal pode ajudar a equilibrar o humor.</p>";
  } else {
    sugestao.innerHTML = "<p>Observe o clima e escolha alimentos que equilibrem seus doshas 😉</p>";
  }
}
//Conecta o clique do botão "buscar clima"
document.getElementById("buscarClima").addEventListener("click", buscarClima);

//Manipulando humor
botoesDeHumor.forEach(botao => {
  botao.addEventListener("click", function () {
    humorSelecionado = botao.dataset.humor;
    console.log("Humor selecionado:", humorSelecionado);

    mostrarSugestao(humorSelecionado);
  });
});

function mostrarSugestao(humor) {
  const resultadoHumor = document.getElementById("resultadoHumor");
  resultadoHumor.hidden = false;

  if (humor === "feliz") {
    resultadoHumor.innerHTML = "<p>Está feliz? Aproveite para dançar, criar ou compartilhar algo com alguém!</p>";
  } else if (humor === "triste") {
    resultadoHumor.innerHTML = "<p>Está triste? Caminhe na natureza, respire fundo ou escreva como se sente.</p>";
  } else if (humor === "calmo") {
    resultadoHumor.innerHTML = "<p>Está calmo? Perfeito para meditar, ouvir um mantra ou apenas contemplar o agora.</p>";
  } else {
    resultadoHumor.innerHTML = "<p>Selecione um humor para receber uma dica</p>";
  }
}