//CONSTANTES DE OBJETOS DOM
const loading = document.querySelector(".loading-container");
const convertBtn = document.getElementById("convertBtn");
const message = loading.querySelector(".blinking");
const spinner = loading.querySelector(".spinner");
const moneyInput = document.getElementById("moneyInput");
const finalResult = document.getElementById("result");
const countrySelect = document.querySelectorAll(".country-select");

//URL DA API
const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

//OBJETO COM TODOS OS NOMES DAS MOEDAS RETIRADAS DO FETCH
const moneyCountryNames = {
  AUD: "Dólar Australiano",
  CAD: "Dólar Cadadense",
  USD: "Dólar Americano",
  EUR: "Euro",
  INR: "Rúpia Indiana",
  CHF: "Franco Suíço",
  GBP: "Libra Esterlina",
  BRL: "Real Brasileiro",
  CNY: "Yuan Chinês",
  JPY: "Iene Japonês",
};

convertBtn.addEventListener("click", () => {
  convertMoney();
});

//FUNÇÃO PARA O LOADING ANTES DE BUSCAR DADOS DA API
function loadingConvert() {
  loading.style.display = "block";
}

//FUNÇÃO ASSINCRONA QUE PREENCHE AS OPÇÕES DO SELECT
async function fillOptions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let rates = data.rates;

    countrySelect.forEach((select) => {
      let countriesArray = Object.keys(moneyCountryNames);

      countriesArray.sort((a, b) => {
        let nameA = moneyCountryNames[a];
        let nameB = moneyCountryNames[b];

        return nameA.localeCompare(nameB);
      });

      countriesArray.forEach((country) => {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = moneyCountryNames[country];
        select.appendChild(option);
      });
    });
  } catch (error) {
    alert("ERRO AO ENCONTRAR PAÍSES!");
    console.log(error);
  }
}

fillOptions();

//FUNÇÃO ASSINCRONA PARA CONVERSÃO DE MOEDAS
async function convertMoney() {
  finalResult.style.color = "#000000";
  finalResult.innerHTML = "";

  if (moneyInput.value === "") {
    finalResult.innerHTML = "<p>VALOR INVÁLIDO!</p>";
    finalResult.style.color = "#ff0000";
    return;
  }

  if ([...countrySelect].some((select) => select.value === "")) {
    finalResult.innerHTML = "<p>SELECIONE UM DOS PAÍSES!</p>";
    finalResult.style.color = "#ff0000";
    return;
  }

  loadingConvert();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    spinner.style.display = "none";
    message.style.display = "block";

    const value = parseFloat(moneyInput.value);
    const from = countrySelect[0].value;
    const to = countrySelect[1].value;

    const valueFrom = data.rates[from];
    const valueTo = data.rates[to];

    const conversion = (value / valueFrom) * valueTo;

    message.style.display = "none";

    finalResult.innerHTML = `<div>
                                  <p style="font-size: 20px">${value} ${from} = ${conversion.toFixed(
      2
    )} ${to}</p>
                                  <p style="font-size: 16px">TAXA: 1 ${from} = ${valueTo} ${to} </p>
                             </div>`;
  } catch (error) {
    message.innerText = "ERRO! ❌";
  }
}
