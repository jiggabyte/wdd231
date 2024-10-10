//Forecast Information
const now = document.querySelector('#today');
const nextDay = document.querySelector('#next-day');
const twoDays = document.querySelector('#two-days');
 
const today = new Date();
const tomorrow = new Date(today);
const afterTomorrow = new Date(today);
 
const todayDate = forecastDateWithTime(today);
 
const tomorrowDate = forecastDateWithTime(addDays(tomorrow, 1));
const afterTomorrowDate = forecastDateWithTime(addDays(afterTomorrow, 2));
 
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.50&units=imperial&lon=-111.41&appid=';

function forecastDateWithTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
 
  return `${year} - ${month} - ${day} ${hours}:00:00`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function displayForecastResults(data) {
  data.list.forEach( item => {
      console.log(todayDate);
      const roundedTemp = Math.round(item.main.temp);

      if (item.dt_txt === todayDate) {
          now.innerHTML = `Today: ${roundedTemp}&deg;F`;
      } else if (item.dt_txt === tomorrowDate) {
          const tomorrowDayName = getWeekdayName(tomorrowDate);
          nextDay.innerHTML = `${tomorrowDayName}: ${roundedTemp}&deg;F`;
      } else if (item.dt_txt === afterTomorrowDate) {
          const afterTomorrowDayName = getWeekdayName(afterTomorrowDate);
          twoDays.innerHTML = `${afterTomorrowDayName}: ${roundedTemp}&deg;F`;
      }
  });
}

function getWeekdayName(dateStr) {
  const date = new date(dateStr);
  const options = { weekday: 'long'};
  return date.toLocalDateStr('en-US', options);
}

 
async function apiFetchForecast() {
    try {
      const response = await fetch(urlForecast);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayForecastResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }    

   
    adjustNext2Hour(today);
   
    tomorrow.setHours(14, 0, 0, 0);
    afterTomorrow.setHours(14, 0, 0, 0);
 
}
 
apiFetchForecast();