var quotes_page = document.querySelector('#menu div a');
quotes_page.classList.add('menu_selected');

const quotes_key = '8a1927d9f8acb0935b759d98c21627ea';
const quotes_request = 'http://api.marketstack.com/v1/tickers?access_key=' + quotes_key + '&exchange=' + mh_quotes.exchange + '&limit=10';
var day_close_request = 'http://api.marketstack.com/v1/eod/latest?access_key=' + quotes_key + '&limit=10&symbols=';

fetch(quotes_request).then(onResponse).then(onCompany);

var company_list = [];
function onCompany(json) {
    company_list = json.data;
    for (let company of company_list) {
        day_close_request += company.symbol + ',';
    }
    day_close_request = day_close_request.substring(0,day_close_request.length-1);
    fetch(day_close_request).then(onResponse).then(onQuotes);
}

function onQuotes (json) {
    let n;
    var company_quotes = json.data;
    var div_nome = document.querySelector('#name');
    var div_open = document.querySelector('#open');
    var div_close = document.querySelector('#close');
    var new_nome = document.createElement('h2');
    var new_open = document.createElement('h2');
    var new_close = document.createElement('h2');
    new_nome.textContent = 'M&H';
    new_open.textContent = mh_quotes.open;
    new_close.textContent = mh_quotes.close;
    div_nome.appendChild(new_nome);
    div_open.appendChild(new_open);
    div_close.appendChild(new_close);
    for (i = 0; i < company_list.length; i++) {
        n = 0;
        while (n !== -1) {
            if (company_quotes[n].symbol == company_list[i].symbol) {
                new_nome = document.createElement('h3');
                new_open = document.createElement('h3');
                new_close = document.createElement('h3');
                new_nome.textContent = company_list[i].name;
                new_open.textContent = company_quotes[n].open;
                new_close.textContent = company_quotes[n].close;
                div_nome.appendChild(new_nome);
                div_open.appendChild(new_open);
                div_close.appendChild(new_close);
                n = -2;
            }
            n++
        }
    }
}

function onResponse(response) {
    return response.json();
}

var righe = document.querySelectorAll('.quotes h3');
var i = 0;
for (let riga of righe) {
    if (i %2 == 0) {
        riga.classList.add('even');
    }
    i++;
}