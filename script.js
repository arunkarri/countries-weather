let countriesApi = 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json';
let weatherApi = function (lat, lng) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e0e6f6d19e66031c7e355b8784f16dab&units=metric`;
};
getData();

async function getData() {
  try {
    let countryReq = await fetch(countriesApi);
    let countryData = await countryReq.json();
    buildUI(countryData);
  } catch (error) {
    console.log(error);
  }
}

function buildUI(data) {
  let contentRow = document.getElementById('content');
  for (let i = 0; i < data.length; i++) {
    let card = createElement('div');
    setAttribute(card, 'class', 'card col-md-3 col-lg-2 col-sm-4 col-xs-6');
    appendChild(contentRow, card);

    let cardHeader = createElement('div');
    setAttribute(cardHeader, 'class', 'card-header country-title');
    cardHeader.innerText = data[i].name;
    appendChild(card, cardHeader);

    let img = createElement('img');
    img.src = data[i].flag;
    setAttribute(img, 'class', 'card-img-top flag');
    appendChild(card, img);

    let capitalDiv = createElement('div');
    appendChild(card, capitalDiv);

    let capitalLabel = createElement('span');
    capitalLabel.innerText = 'Capital: ';
    appendChild(capitalDiv, capitalLabel);

    let capital = createElement('span');
    setAttribute(capital, 'class', 'badge badge-success');
    capital.innerText = data[i].capital;
    appendChild(capitalDiv, capital);

    let codesDiv = createElement('div');
    appendChild(card, codesDiv);

    let codesLabel = createElement('span');
    codesLabel.innerText = 'Country Codes: ';
    appendChild(codesDiv, codesLabel);

    let codes = createElement('b');
    codes.innerText = `${data[i].alpha2Code}, ${data[i].alpha3Code}`;
    appendChild(codesDiv, codes);

    let regionDiv = createElement('div');
    appendChild(card, regionDiv);

    let regionLabel = createElement('span');
    regionLabel.innerText = 'Region: ';
    appendChild(regionDiv, regionLabel);

    let region = createElement('b');
    region.innerText = data[i].region;
    appendChild(regionDiv, region);

    let btnDiv = createElement('div');
    setAttribute(btnDiv, 'class', 'weather-button')
    appendChild(card, btnDiv);

    let weatherBtn = createElement('button');
    setAttribute(weatherBtn, 'type', 'button');
    setAttribute(weatherBtn, 'class', 'btn btn-xs btn-outline-light');
    weatherBtn.innerText = 'Click for Weather';
    setAttribute(weatherBtn, 'onclick', `getWeather(${data[i].latlng[0]},${data[i].latlng[1]},${i})`);
    appendChild(btnDiv, weatherBtn);

    let weatherDiv = createElement('i');
    setAttribute(weatherDiv, 'id', `country${i}`);
    card.appendChild(weatherDiv);
  }
}

async function getWeather(lat, lng, id) {
  try {
    let weatherReq = await fetch(weatherApi(lat, lng));
    let weatherData = await weatherReq.json();
    let weatherDiv = document.getElementById(`country${id}`);
    weatherDiv.innerHTML = `<b>Current Weather</b> : ${weatherData.weather[0].description}
    <b>Temperature</b> : <b>${weatherData.main.temp} C</b>, Feels like <b>${weatherData.main.feels_like} C</b>
    `;
  } catch (err) {
    console.log(err);
  }
}
