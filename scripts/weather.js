// Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL with latitude and longitude of Trier, Germany
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.50&lon=7.04&units=metric&appid=c5ffeefd89e2d92b78c974bdeeb0343f';

// Async function to fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // Uncomment to display data on the page
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to display results
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}`;
  
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  
  captionDesc.textContent = `${data.weather[0].description}`;
}

// Call the function to fetch and display weather
apiFetch();
