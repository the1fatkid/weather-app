const apiKey = config.apiToken;

// Did't work
// const apiKey = process.env.API_KEY;
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchForm = document.querySelector(".search");

const weatherIconDiv = document.querySelector(".weatherIcon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".content").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(".weather").innerHTML=data.weather[0].main;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
    document.querySelector(".minTemp").innerHTML = data.main.temp_min + "°";
    document.querySelector(".maxTemp").innerHTML = data.main.temp_max + "°";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    document.querySelector(".humidityPercent").innerHTML = data.main.humidity + "%";
    

    console.log(data.weather[0].main);

    
    let iconClass;
    if (data.weather[0].main == "Clouds") {
      iconClass = "fa-cloud";
    } else if (data.weather[0].main == "Clear") {
      iconClass = "fa-sun";
    } else if (data.weather[0].main == "Mist" || data.weather[0].main =="Haze") {
      iconClass = "fa-smog";
    } else if (data.weather[0].main == "Drizzle") {
      iconClass = "fa-cloud-rain";
    } else if (data.weather[0].main == "Snow") {
      iconClass = "fa-snowflake";
    } else if (data.weather[0].main == "Rain") {
      iconClass = "fa-cloud-showers-heavy";
    }

    const iconElement = document.createElement("i");
    iconElement.classList.add("fa-solid", iconClass);

    // Clearing the div before appending new <i> element
    weatherIconDiv.innerHTML = "";
    weatherIconDiv.appendChild(iconElement);

    document.querySelector(".content").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchForm.addEventListener("submit", () => {
  checkWeather(searchBox.value);
});
