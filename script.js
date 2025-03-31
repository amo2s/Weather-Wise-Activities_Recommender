const apiKey = '8a6b39ac48083b9dc055856c0629e747'; const weatherInfo = document.getElementById('weatherInfo');

function fetchWeather(lat, lon) { const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey};

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }
        displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather:', error));

}

function fetchWeatherByCity(city) { const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey};

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== 200) {
            weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            return;
        }
        displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather:', error));

}

function displayWeather(data) { const { name, main, weather } = data; weatherInfo.innerHTML = <h2>Weather in ${name}</h2> <p>Temperature: ${main.temp}°C</p> <p>Condition: ${weather[0].description}</p>; }

// Speech Recognition const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); recognition.lang = 'en-US'; recognition.interimResults = false; recognition.maxAlternatives = 1;

recognition.onresult = function(event) { const city = event.results[0][0].transcript; fetchWeatherByCity(city); };

recognition.onerror = function(event) { console.error('Speech recognition error:', event.error); };

// Get User Location if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(position => { fetchWeather(position.coords.latitude, position.coords.longitude); }, error => { console.error('Geolocation error:', error); }); } else { console.error('Geolocation not supported'); }


};

