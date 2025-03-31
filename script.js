// Function to fetch weather data from OpenWeatherMap API
async function fetchWeather(location) {
  const apiKey = '8a6b39ac48083b9dc055856c0629e747'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Function to display weather information and icon
function displayWeather(weatherData) {
  const weatherSection = document.getElementById('weather');
  weatherSection.innerHTML = ''; // Clear previous weather data

  if (weatherData) {
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description.toLowerCase();
      let iconSrc;

      // Determine which icon to use based on weather description
      if (description.includes('clear')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/sun%20icon.png?raw=true';
      } else if (description.includes('cloud')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/cloud%20icon.png?raw=true';
      } else if (description.includes('rain')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/rain%20icon.png?raw=true';
      } else if (description.includes('drizzle')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/rain%20icon.png?raw=true';
      } else if (description.includes('thunderstorm')) {
          iconSrc = 'img/thunderstorm icon.png';
      } else if (description.includes('snow')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/snowflake%20icon.png?raw=true';
      } else if (description.includes('mist') || description.includes('fog')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/fog%20icon.png?raw=true';
      } else if (description.includes('smoke')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/windy%20icon.png?raw=true';
      } else if (description.includes('haze')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/haze%20icon%20(1).png?raw=true';
      } else if (description.includes('sand') || description.includes('dust')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/windy%20icon.png?raw=true';
      } else if (description.includes('tornado')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/thunderstorm%20icon.png?raw=true';
      } else if (description.includes('squall')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/windy%20icon.png?raw=true';
      } else if (description.includes('storm')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/thunderstorm%20icon.png?raw=true';
      } else if (description.includes('ash')) {
          iconSrc = 'https://github.com/amo2s/WeatherWise-Activity-Recommender/blob/main/thunderstorm%20icon.png?raw=true';
      } else {
          // Default icon if no specific condition is matched
          iconSrc = 'icons/default-icon.png';
      }

      // Create and insert the weather icon element
      const weatherIcon = document.createElement('img');
      weatherIcon.src = iconSrc;
      weatherIcon.alt = 'Weather icon';
      weatherIcon.classList.add('weather-icon');
      weatherSection.appendChild(weatherIcon);

      // Display weather information
      const weatherInfo = document.createElement('div');
      weatherInfo.classList.add('weather-info');
      weatherInfo.innerHTML = `
          <h3>Current Weather</h3>
          <p><strong>Temperature:</strong> ${temperature}°C</p>
          <p><strong>Description:</strong> ${description}</p>
      `;
      weatherSection.appendChild(weatherInfo);
  } else {
      weatherSection.innerHTML = '<p>Weather information not available.</p>';
  }
}


// Function to recommend activities based on weather data
function recommendActivities(weatherData) {
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description.toLowerCase();

  let activities = [];

  // Based on temperature
  if (temperature >= 25) {
      activities.push('Go for a swim at the beach or pool.');
      activities.push('Have a picnic in the park.');
      activities.push('Go for a hike in the mountains.');
  } else if (temperature >= 15) {
      activities.push('Take a walk in the park.');
      activities.push('Go for a bike ride.');
      activities.push('Play outdoor sports like soccer or basketball.');
  } else {
      activities.push('Stay indoors and watch a movie.');
      activities.push('Read a book at home.');
      activities.push('Cook a nice meal indoors.');
  }

  // Based on weather conditions
  if (description.includes('rain')) {
      activities = ['Stay indoors and avoid outdoor activities due to rain.'];
  }

  return activities;
}

// Function to display recommended activities on the UI
function displayActivities(activities) {
  const activitiesSection = document.getElementById('activities');
  activitiesSection.innerHTML = ''; // Clear previous activities

  if (activities.length > 0) {
      const activitiesList = document.createElement('ul');
      activitiesList.classList.add('activity-list');
      activities.forEach(activity => {
          const activityItem = document.createElement('li');
          activityItem.textContent = activity;
          activitiesList.appendChild(activityItem);
      });
      activitiesSection.appendChild(activitiesList);
  } else {
      activitiesSection.innerHTML = '<p>No activities recommended.</p>';
  }
}

// Event listener for submit button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit-location').addEventListener('click', async () => {
      const locationInput = document.getElementById('location-input').value.trim();
      if (locationInput !== '') {
          const weatherData = await fetchWeather(locationInput);
          displayWeather(weatherData); // Display weather data and icon on the UI
          if (weatherData) {
              const activities = recommendActivities(weatherData);
              displayActivities(activities); // Display recommended activities on the UI
          }
      } else {
          alert('Please enter a location.');
      }
  });
});
// WeatherWise Voice Interaction - Phase 1

// Check if browser supports Speech Synthesis & Recognition const synth = window.speechSynthesis; const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; const recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.continuous = false; recognition.interimResults = false;

// Function to speak text function speak(text) { const utterance = new SpeechSynthesisUtterance(text); utterance.rate = 1; synth.speak(utterance); }

// Function to get user location function getLocation() { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition( position => { const lat = position.coords.latitude; const lon = position.coords.longitude; fetchWeather(lat, lon); }, () => { speak("I couldn't access your location. Please say your city name."); recognition.start(); } ); } else { speak("Your browser does not support location access. Please say your city name."); recognition.start(); } }

// Function to fetch weather data function fetchWeather(lat, lon) { const apiKey = '8a6b39ac48083b9dc055856c0629e747'; const url = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey};

fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const city = data.name;
        suggestActivity(city, weather, temp);
    })
    .catch(() => speak("I couldn't fetch the weather. Please try again later."));

}

// Function to suggest activities function suggestActivity(city, weather, temp) { let activity = ""; if (weather.includes("rain")) { activity = "a cozy indoor activity like reading or watching a movie."; } else if (temp > 30) { activity = "going for a swim or having a cool drink at a café."; } else { activity = "taking a walk or enjoying outdoor games."; }

speak(`The weather in ${city} is ${temp} degrees Celsius with ${weather}. I recommend ${activity}`);

}

// Start interaction speak("Hey there! Let's plan your day. Can I access your location?"); setTimeout(getLocation, 3000);

// Handle speech recognition result recognition.onresult = function(event) { const city = event.results[0][0].transcript; const apiKey = '8a6b39ac48083b9dc055856c0629e747'; const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey};

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === 200) {
            suggestActivity(city, data.weather[0].description, data.main.temp);
        } else {
            speak("I couldn't find that city. Please try again.");
            recognition.start();
        }
    })
    .catch(() => speak("Something went wrong. Please try again."));

};

