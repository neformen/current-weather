let listOfCities,
    inputCityField,
    searchCityButton,
    clearAllCityButton;

function httpGet(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error('Network Error'));
        };

        xhr.send();
    });

}

function createUrl(city) {
    let appid = 'e917db498668458f5559e2b5c819dbf8';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;
    return url;
}

function getCelciusTempetature(temperature) {
    let celcTemperature = (temperature - 273.3);
    return celcTemperature;
}

function createLiTemplate({city, country, temperature, weather}) {
    let temperatureCelcius = getCelciusTempetature(temperature);
    let liElement = document.createElement('li');
    liElement.className = 'weater-city-item';
    let innerLiText = `<span class="city-name">${city}</span>,
                      <span class="city-country"> ${country}</span>,
                      <span class="city-temperature"> ${temperatureCelcius}&deg; С</span>,
                      <span class="city-weater">${weather}</span>`;
    liElement.innerHTML = innerLiText;
    return liElement;
}

function init() {
    listOfCities = document.getElementById('list-of-cities');
    inputCityField = document.getElementById('city-name');
    searchCityButton = document.getElementById('search-city');
    clearAllCityButton = document.getElementById('clear-cities');

    searchCityButton.addEventListener('click', function() {
        let cityName = inputCityField.value;

        getWeather(cityName);
    });

    clearAllCityButton.addEventListener('click', function() {
        listOfCities.innerHTML = '';
    });
}

function getWeather(city) {
    let cityWeatherUrl = createUrl(city);
    httpGet(cityWeatherUrl).then(data => {
        let configurateObject = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            weather: data.weather[0].description
        };
        let liItem = createLiTemplate(configurateObject);
        listOfCities.appendChild(liItem);
    })
}

init();