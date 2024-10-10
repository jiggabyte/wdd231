// Function to get the current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Function to get the last modification date
document.getElementById("lastModified").textContent = document.lastModified;


const menuButton = document.getElementById('menuBtn');
const listNav = document.getElementById('listNav');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    if (listNav.style.display === "flex") {
        listNav.style.display = "none"; // Hide menu
    } else {
        listNav.style.display = "flex"; // Show menu
    }
});

const capitalizeWords = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// API URL with latitude and longitude of Trier, Germany
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.50&lon=7.04&units=metric&appid=c5ffeefd89e2d92b78c974bdeeb0343f';

const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=5.50&lon=7.04&units=metric&appid=c5ffeefd89e2d92b78c974bdeeb0343f';


// Async function to fetch weather data
const apiFetch = async (urlData, call_type = false) => {
    try {
        const response = await fetch(urlData);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only     
            if (call_type) {
                displayForecastResults(data); // Uncomment to display data on the page
            } else {
                displayResults(data); // Uncomment to display data on the page
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to display results
const displayResults = (data) => {
    document.getElementById('current-temperature').innerText = `Current Temp: ${Math.round(data.main.temp.toFixed(1))}°C`;
    document.getElementById('weather-description').innerText = data.weather.map(event => capitalizeWords(event.description)).join(", ");
}

// Function to display forecast results
const displayForecastResults = (data) => {
    let tempData = [];
    let tempItem = "";
    data.list.forEach((item) => {
        if(tempItem != item.dt_txt.slice(0,11)){
            tempItem = item.dt_txt.slice(0,11);
            if(tempData.length < 3){
                tempData.push(item);
            }   
        }
    });

    document.getElementById('forecast').innerHTML = `
    <p>Date: ${tempData[0].dt_txt.slice(0,11)}<span>Temperature: ${tempData[0].main.temp}</span></p>
    <p>Date: ${tempData[1].dt_txt.slice(0,11)}<span>Temperature: ${tempData[1].main.temp}</span></p>
    <p>Date: ${tempData[2].dt_txt.slice(0,11)}<span>Temperature: ${tempData[2].main.temp}</span></p>    
    `;
}

getRandomMembers = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Call the function to fetch and display weather
apiFetch(url);

apiFetch(urlForecast, true);


// Fetching the member data from the JSON file
const loadMembers = async () => {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const spotlightDiv = document.querySelector('.spotlight-container');
    spotlightDiv.innerHTML = ''; // Clear previous content

    const goldSilverMembers = members.filter(member => member.membership_level === 3 || member.membership_level === 2);
    const selectedMembers = getRandomMembers(goldSilverMembers, 3);

    selectedMembers.forEach(member => {
        const section = document.createElement('section');
        section.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership_level}</p>
        `;
        spotlightDiv.appendChild(section);
    });
}


loadMembers();