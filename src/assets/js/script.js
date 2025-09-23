const loading = document.querySelector(".loading-container");
const convertBtn = document.getElementById("convertBtn");
const message = loading.querySelector(".blinking");
const spinner = loading.querySelector(".spinner");
const moneyInput = document.getElementById("moneyInput");
const finalResult = document.getElementById("result");

const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

convertBtn.addEventListener("click", () => {
  convertMoney();
});

function loadingConvert() {
  loading.style.display = "block";
}

async function convertMoney() {
  finalResult.style.color = "#000000";
  finalResult.innerHTML = "";

  if (moneyInput.value === "") {
    finalResult.innerHTML = "<p>VALOR INVÁLIDO!</p>";
    finalResult.style.color = "#ff0000";
    return;
  }

  loadingConvert();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    spinner.style.display = "none";
    message.innerText = "CONSEGUI!";
  } catch (error) {
    message.innerText = "ERRO! ❌";
  }
}
