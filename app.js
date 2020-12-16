const timezone = document.querySelector('.timezone');
const weatherIcon = document.querySelector('.weather-icon');
const currentTemp = document.querySelector('.curTemp');
const tempSymbol = document.querySelector('.temp-symbol');
const time = document.querySelector('.time');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature')


let lon;
let lat;

const api_key = 'f1807922ea080e8b61706c1e3f1c496a'


if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        console.log(api)

        fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const {name} = data;
            const {country} = data.sys;

            timezone.textContent = `${name}, ${country}`;


            const {icon, description} = data.weather[0];

            weatherIcon.src = `icons/${icon}.svg`;
            weatherDescription.textContent = description;


            let {temp} = data.main;

            let celsius = Math.ceil(temp - 273.15);
            let fahrenheit = Math.floor((temp - 273.15) * (9/5) + 32);
            currentTemp.textContent = `${fahrenheit}°`


            temperature.addEventListener('click', () => {
                if (tempSymbol.textContent === "K") {
                    currentTemp.textContent = `${celsius}°`;
                    tempSymbol.textContent = "C";
                }else if (tempSymbol.textContent === "C"){
                    currentTemp.textContent = `${fahrenheit}°`;
                    tempSymbol.textContent = "F";
                }else{
                    temp = Math.floor(temp);
                    currentTemp.textContent = `${temp}°`;
                    tempSymbol.textContent = "K";
                }
            })
            tempSymbol.innerHTML = `<span>F</span>`;

        })
        
    });
}

let currentDate = new Date();
let currentHour =   currentDate.getHours();
let currentMinute =   currentDate.getMinutes();
time.textContent = `${currentHour}:${currentMinute}`;