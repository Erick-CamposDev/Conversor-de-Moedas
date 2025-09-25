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
  AED: "Dirham dos Emirados",
  AFN: "Afegane Afegão",
  ALL: "Lek Albanês",
  AMD: "Dram Armênio",
  ANG: "Florim das Antilhas Holandesas",
  AOA: "Kwanza Angolano",
  ARS: "Peso Argentino",
  AUD: "Dólar Australiano",
  AWG: "Florim Arubano",
  AZN: "Manat Azerbaijano",
  BAM: "Marco Conversível Bósnio",
  BBD: "Dólar Barbadiano",
  BDT: "Taka de Bangladesh",
  BGN: "Lev Búlgaro",
  BHD: "Dinar do Bahrein",
  BIF: "Franco Burundiano",
  BMD: "Dólar Bermudense",
  BND: "Dólar de Brunei",
  BOB: "Boliviano",
  BRL: "Real Brasileiro",
  BSD: "Dólar das Bahamas",
  BTN: "Ngultrum Butanês",
  BWP: "Pula Botsuanense",
  BYN: "Rublo Bielorrusso",
  BZD: "Dólar de Belize",
  CAD: "Dólar Canadense",
  CDF: "Franco Congolês",
  CHF: "Franco Suíço",
  CLP: "Peso Chileno",
  CNY: "Yuan Chinês",
  COP: "Peso Colombiano",
  CRC: "Colón Costarriquenho",
  CUP: "Peso Cubano",
  CVE: "Escudo Cabo-verdiano",
  CZK: "Coroa Checa",
  DJF: "Franco Djibutiano",
  DKK: "Coroa Dinamarquesa",
  DOP: "Peso Dominicano",
  DZD: "Dinar Argelino",
  EGP: "Libra Egípcia",
  ERN: "Nakfa Eritreano",
  ETB: "Birr Etíope",
  EUR: "Euro",
  FJD: "Dólar Fijiano",
  FKP: "Libra das Ilhas Falkland",
  FOK: "Coroa Faroe",
  GBP: "Libra Esterlina",
  GEL: "Lari Georgiano",
  GGP: "Libra de Guernsey",
  GHS: "Cedi Ganês",
  GIP: "Libra de Gibraltar",
  GMD: "Dalasi Gambiano",
  GNF: "Franco Guineense",
  GTQ: "Quetzal Guatemalteco",
  GYD: "Dólar Guianense",
  HKD: "Dólar de Hong Kong",
  HNL: "Lempira Hondurenha",
  HRK: "Kuna Croata",
  HTG: "Gourde Haitiano",
  HUF: "Forint Húngaro",
  IDR: "Rupia Indonésia",
  ILS: "Novo Shekel Israelense",
  IMP: "Libra da Ilha de Man",
  INR: "Rupia Indiana",
  IQD: "Dinar Iraquiano",
  IRR: "Rial Iraniano",
  ISK: "Coroa Islandesa",
  JEP: "Libra de Jersey",
  JMD: "Dólar Jamaicano",
  JOD: "Dinar Jordaniano",
  JPY: "Iene Japonês",
  KES: "Xelim Queniano",
  KGS: "Som Quirguiz",
  KHR: "Riel Cambojano",
  KID: "Dólar Kiribati",
  KMF: "Franco Comorense",
  KRW: "Won Sul-coreano",
  KWD: "Dinar Kuwaitiano",
  KYD: "Dólar das Ilhas Cayman",
  KZT: "Tenge Cazaque",
  LAK: "Kip Laosiano",
  LBP: "Libra Libanesa",
  LKR: "Rupia do Sri Lanka",
  LRD: "Dólar Liberiano",
  LSL: "Loti Lesotiano",
  LYD: "Dinar Líbio",
  MAD: "Dirham Marroquino",
  MDL: "Leu Moldávio",
  MGA: "Ariary Malgaxe",
  MKD: "Dinar Macedônio",
  MMK: "Kyat Birmanês",
  MNT: "Tugrik Mongol",
  MOP: "Pataca Macaense",
  MRU: "Ouguiya Mauritana",
  MUR: "Rupia Maurícia",
  MVR: "Rufiyaa Maldiva",
  MWK: "Kwacha Malauiano",
  MXN: "Peso Mexicano",
  MYR: "Ringgit Malaio",
  MZN: "Metical Moçambicano",
  NAD: "Dólar Namíbio",
  NGN: "Naira Nigeriana",
  NIO: "Córdoba Nicaraguense",
  NOK: "Coroa Norueguesa",
  NPR: "Rupia Nepalesa",
  NZD: "Dólar Neozelandês",
  OMR: "Rial Omanense",
  PAB: "Balboa Panamenho",
  PEN: "Sol Peruano",
  PGK: "Kina Papuásio",
  PHP: "Peso Filipino",
  PKR: "Rupia Paquistanesa",
  PLN: "Złoty Polonês",
  PYG: "Guarani Paraguaio",
  QAR: "Rial Catarense",
  RON: "Leu Romeno",
  RSD: "Dinar Sérvio",
  RUB: "Rublo Russo",
  RWF: "Franco Ruandês",
  SAR: "Rial Saudita",
  SBD: "Dólar das Ilhas Salomão",
  SCR: "Rupia Seichelense",
  SDG: "Libra Sudanesa",
  SEK: "Coroa Sueca",
  SGD: "Dólar de Singapura",
  SHP: "Libra de Santa Helena",
  SLE: "Leone da Serra Leoa",
  SLL: "Leone da Serra Leoa",
  SOS: "Xelim Somaliano",
  SRD: "Dólar Surinamês",
  SSP: "Libra do Sudão do Sul",
  STN: "Dobra Santomense",
  SYP: "Libra Síria",
  SZL: "Lilangeni Suazi",
  THB: "Baht Tailandês",
  TJS: "Somoni Tajique",
  TMT: "Manat Turcomeno",
  TND: "Dinar Tunisiano",
  TOP: "Pa’anga Tonganês",
  TRY: "Lira Turca",
  TTD: "Dólar de Trinidad e Tobago",
  TVD: "Dólar Tuvaluano",
  TWD: "Novo Dólar Taiwanês",
  TZS: "Xelim Tanzaniano",
  UAH: "Hryvnia Ucraniana",
  UGX: "Xelim Ugandense",
  USD: "Dólar Americano",
  UYU: "Peso Uruguaio",
  UZS: "Som Usbeque",
  VES: "Bolívar Venezuelano",
  VND: "Dong Vietnamita",
  VUV: "Vatu Vanuatuano",
  WST: "Tala Samoano",
  XAF: "Franco CFA BEAC",
  XCD: "Dólar do Caribe Oriental",
  XCG: "Moeda do Fundo Monetário",
  XDR: "Direitos Especiais de Saque (FMI)",
  XOF: "Franco CFA BCEAO",
  XPF: "Franco CFP",
  YER: "Rial Iemenita",
  ZAR: "Rand Sul-africano",
  ZMW: "Kwacha Zambiano",
  ZWL: "Dólar Zimbabuano",
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
      let ratesArray = Object.keys(rates);

      ratesArray.sort((a, b) => {
        let nameA = moneyCountryNames[a];
        let nameB = moneyCountryNames[b];

        return nameA.localeCompare(nameB);
      });

      ratesArray.forEach((country) => {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = moneyCountryNames[country];
        select.appendChild(option);
      });
    });
  } catch (error) {
    alert("ERRO AO ENCONTRAR PAÍSES!");
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

    finalResult.innerHTML = `<p>O valor convertido de ${value} de ${from} para ${to} é de ${conversion.toFixed(
      2
    )} ${to}</p>`;
  } catch (error) {
    message.innerText = "ERRO! ❌";
  }
}
