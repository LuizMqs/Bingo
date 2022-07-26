let cartela = [];
let bingo = [];

function gerarCartela() {
  for (let x = 0; x <= 2; x++) {
    document.querySelector("#mostrar_cartelas").innerHTML += `
        <tr></tr>
    `;
    for (let i = 0; i <= 9; i++) {
      let linha = document.querySelectorAll("tr");

      if (linha.length) {
        linha[linha.length - 1].innerHTML += `
            <th>${sortearCartela()}</th>
        `;
      } else {
        linha.innerHTML += `
            <th >${sortearCartela()}</th>
        `;
      }
    }
  }
}

function sortearBingo() {
  let numeroBingo;

  do {
    numeroBingo = Math.floor(Math.random() * 75 + 1);
  } while (!bingo.every((num) => num != numeroBingo));

  bingo.push(numeroBingo);

  document.querySelector("h2").innerHTML = numeroBingo;

  document.querySelectorAll("th").forEach((numero) => {
    if (numero.innerHTML == numeroBingo) {
      numero.style.cursor = "pointer";
      numero.addEventListener("click", (e) => {
        numero.classList.add("colored");
        verificarGanhador();
      });
    }
  });
}

function sortearCartela() {
  let numeroBingo;

  do {
    numeroBingo = Math.floor(Math.random() * 75 + 1);
  } while (foiSorteado(numeroBingo));

  return numeroBingo;
}

function foiSorteado(num) {
  let numeros_sorteados = document.querySelectorAll("th");
  let verificar = false;

  numeros_sorteados.forEach((numero_sorteado, index) => {
    if (numeros_sorteados.length < 10) {
      if (numero_sorteado.innerHTML == num) verificar = true;
    } else if (numeros_sorteados.length < 20) {
      if (numero_sorteado.innerHTML == num && index >= 9) verificar = true;
    } else {
      if (numero_sorteado.innerHTML == num && index >= 19) verificar = true;
    }
  });
  return verificar;
}

gerarCartela();

function verificarGanhador() {
  const cartela1 = document.querySelectorAll("tr")[0].childNodes;
  const cartela2 = document.querySelectorAll("tr")[1].childNodes;
  const cartela3 = document.querySelectorAll("tr")[2].childNodes;

  console.log(cartela1);
  let cont = 0;

  cartela1.forEach((num, index) => {
    if (index % 2 != 0) {
      if (num.classList.contains("colored")) cont++;
    }
  });
  if (cont == 10) {
    document.querySelector("h2").innerHTML = "cartela 1";
    clearInterval(interval);
  }
  cont = 0;
  cartela2.forEach((num, index) => {
    if (index % 2 != 0) {
      if (num.classList.contains("colored")) cont++;
    }
  });
  if (cont == 10) {
    document.querySelector("h2").innerHTML = "cartela 2";
    clearInterval(interval);
  }
  cont = 0;
  cartela3.forEach((num, index) => {
    if (index % 2 != 0) {
      if (num.classList.contains("colored")) cont++;
    }
  });
  if (cont == 10) {
    document.querySelector("h2").innerHTML = "cartela 3";
    clearInterval(interval);
  }
}

let interval = 0;

document.querySelector("#sortear").addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      if (bingo.length != 75) {
        sortearBingo();
      } else {
        document.querySelector("h2").innerHTML =
          "todos os numeros foram sorteados";
        clearInterval(interval);
      }
    }, 5000);
  }
});
