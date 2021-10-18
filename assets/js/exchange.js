const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const elementJPY = document.querySelector('[data-value="JPY"]');
const elementAUD = document.querySelector('[data-value="AUD"]');
const elementCNY = document.querySelector('[data-value="CNY"]');

const input1 = document.querySelector('#input1');
const result1 = document.querySelector('#result1');
const select1 = document.querySelector('#select1');

const input2 = document.querySelector('#input2');
const result2 = document.querySelector('#result2');
const select2 = document.querySelector('#select2');

getCurrencies();

async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.JPY = result.Valute.JPY;
    rates.AUD = result.Valute.AUD;
    rates.CNY = result.Valute.CNY;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
    elementJPY.textContent = rates.JPY.Value.toFixed(2);
}

input1.oninput = convertValue1;
select1.oninput = convertValue1;

function convertValue1() {
    result1.value = (parseFloat(input1.value) / rates[select1.value].Value).toFixed(2);
}

input2.oninput = convertValue2;
select2.oninput = convertValue2;

function convertValue2() {
    result2.value = (parseFloat(input2.value) * rates[select2.value].Value).toFixed(2);
}