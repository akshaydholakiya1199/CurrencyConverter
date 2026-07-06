const BASE_URL = "https://api.exchangerate-api.com/v4/latest"; //API Base URL


//accessing html elements
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const date = document.querySelector(".date");

//accessing all countryCode & creating new option
for(let select of dropdown){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//calling API by main URL, JSON formate to readable formate , 
// operations to calc value
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1 ;
        amount.value = "1" ;
    }

   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;

   fromCurrToLower = fromCurr.value.toLowerCase();
   toCurrToLower = toCurr.value.toLowerCase();

   let response = await fetch(URL);

   let data = await response.json();
   
   let allRate = data.rates;

   let rate = allRate[toCurr.value.toUpperCase()];

   let finalAmount = amtValue*rate;

   msg.innerText = `${amtValue} ${fromCurrToLower} = ${finalAmount}  ${toCurrToLower} `;

   date.innerText = data.date;
};


//update flag using image API
const updateFlag = (element) => {
    let currCode = element.value ;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

//pre-defined exchange rate
window.addEventListener("load", () => {
    updateExchangeRate();
});

//Function of the button
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

