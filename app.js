import config from "./config.js";

// API Information
const apiKey = `${config.apiKey}`; // Replace this with your actual OpenWeather API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');

// Event Listener
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } 
});

// Fetch Weather Data
async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

        // Error Handling for HTTP errors
        if (!response.ok) {
            throw new Error('City not found or API error');
        }

        const data = await response.json();
        displayWeather(data);
        errorMessage.classList.add('d-none');
    } catch (error) {
        // Display error message
        showErrorMessage(`${error.message}`);
    }
}

// Display Weather Data
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherResult.classList.remove('d-none');
    cityInput.value = '';  // Clear input after submission
}

function showErrorMessage(message) {
    weatherResult.classList.add('d-none');
    errorMessage.classList.remove('d-none');
    errorMessage.textContent = message;
}