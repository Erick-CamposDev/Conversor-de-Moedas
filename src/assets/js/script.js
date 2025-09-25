const loading = document.querySelector(".loading-container");
const convertBtn = document.getElementById("convertBtn");
const message = loading.querySelector(".blinking");
const spinner = loading.querySelector(".spinner");
const moneyInput = document.getElementById("moneyInput");
const finalResult = document.getElementById("result");
const countrySelect = document.querySelectorAll(".country-select");

const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

convertBtn.addEventListener("click", () => {
  convertMoney();
});

function loadingConvert() {
  loading.style.display = "block";
}

async function fillOptions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let rates = data.rates;

    countrySelect.forEach((select) => {
      for (const country in rates) {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        select.appendChild(option);
      }
    });
  } catch (error) {
    alert("ERRO AO ENCONTRAR PAÍSES!");
  }
}

fillOptions();

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

    finalResult.innerHTML = `<p>O valor convertido de ${value} de ${from} para ${to} é de ${conversion.toFixed(
      2
    )}${to}</p>`;
  } catch (error) {
    message.innerText = "ERRO! ❌";
  }
}
