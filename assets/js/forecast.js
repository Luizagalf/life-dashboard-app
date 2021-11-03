document.addEventListener("DOMContentLoaded", function (event) {
    getDayIcon();
});

let date = new Date();
let time = date.getHours();

function getDayIcon() {
    if (time >= 5 && time < 12) {
        let dayIcon = document.getElementById('day_icon_box');
        dayIcon.style.backgroundImage = "url('Assets/images/morning.jpg')";
    }
    if (time >= 12 && time < 17) {
        let dayIcon = document.getElementById('day_icon_box');
        dayIcon.style.backgroundImage = "url('Assets/images/dayicon.jpg')";
    }
    if (time >= 17 && time < 22) {
        let dayIcon = document.getElementById('day_icon_box');
        dayIcon.style.backgroundImage = "url('Assets/images/evening.jpg')";
    }
    if (time >= 22 && time < 5) {
        let dayIcon = document.getElementById('day_icon_box');
        dayIcon.style.backgroundImage = "url('Assets/images/nightIcon.jpg')";
    }
}

const key = '&appid=77563d0b85ff6645fb4a1ff6cd388c22'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
const deg = '°C'

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15)
    return celcius
}

const spitOutGPaskal = (mmHg) => {
    pressureHg = Math.round(mmHg / 1.333)
    return pressureHg
}


getWeather.addEventListener('click', function (event) {
    let city = document.getElementById('forecast_form_id').value
    fetch(baseURL + city + key)
        .then(response => response.json())
        .then(weather => {
            document.querySelector('.city_name').innerText = weather.name;
            document.querySelector('.tempValue').innerText = spitOutCelcius(weather.main.temp) + ' ' + deg;
            document.querySelector('.high_temp').innerText = 'H: ' + spitOutCelcius(weather.main.temp_max) + ' ' + deg;
            document.querySelector('.low_temp').innerText = 'L: ' + spitOutCelcius(weather.main.temp_min) + ' ' + deg;
            document.querySelector('.pressure').innerText = spitOutGPaskal(weather.main.pressure) + ' mm Hg';
            document.querySelector('.humidity').innerText = (weather.main.humidity) + '%';
            document.querySelector('.condition').innerText = weather.weather[0].description;

            const iconcode = weather.weather[0].icon
            const iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
            document.querySelector('.current_weather_icon').src = iconurl

        })
        .catch(err => console.log(err))

    document.getElementById('errorMessage').innerHTML = '';
    const correctCity = document.getElementById('forecast_form_id')
    if (correctCity.value == '') {
        document.getElementById('errorMessage').innerHTML = 'You did not fill the field<br>';
    }

});