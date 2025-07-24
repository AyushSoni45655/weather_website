const inputfield = document.querySelector("#inputs");
const cityDisplay = document.querySelector("#city");
const w_min = document.querySelector(".sp1");
const w_max = document.querySelector(".sp2");
const temprature = document.getElementById("temp");
const cloud_icon = document.querySelector("#weatherIcon");
const dateTime = document.querySelector("#dortime");
const weather_forCast = document.querySelector(".btn");
const humidity = document.querySelector("#hum");
const pressures = document.querySelector("#pre");
const windss = document.querySelector("#wi");
const feellike = document.querySelector("#fl");

// Optional: Add a weather description field
// const weatherDesc = document.querySelector("#weatherDesc");

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

// Fetch Weather Data Function
const fetchApiData = async (cityName = "delhi") => {
  const apiKey = "5490cc5cd1a51188b7bd3b4b65c69b5a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    cityDisplay.textContent = "Loading..."; // UX improvement

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      cityDisplay.textContent = "City not found 😞";
      temprature.textContent = "--";
      weather_forCast.textContent = "--";
      cloud_icon.src = "";
      w_min.textContent = "";
      w_max.textContent = "";
      humidity.textContent = "";
      pressures.textContent = "";
      feellike.textContent = "";
      windss.textContent = "";
      dateTime.textContent = "";
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    const fullCountryName = regionNames.of(sys.country);
    cityDisplay.textContent = `${name}, ${fullCountryName}`;
    w_min.textContent = `Min : ${Math.floor(main.temp_min)}°C`;
    w_max.textContent = `Max : ${Math.floor(main.temp_max)}°C`;
    humidity.textContent = `${main.humidity}%`;
    pressures.textContent = `${main.pressure} hPa`;
    feellike.textContent = `${Math.floor(main.feels_like)}°C`;
    windss.textContent = `${wind.speed} m/s`;

    // Format Date and Time
    const date = new Date(dt * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    dateTime.textContent = date.toLocaleString("en-US", options);

    temprature.textContent = `${Math.floor(main.temp)}°C`;
    weather_forCast.textContent = `${weather[0].main}`;
    // weatherDesc.textContent = weather[0].description;

    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    cloud_icon.src = iconUrl;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    cityDisplay.textContent = "Error loading data";
  }
};

// Load default weather data
fetchApiData();

// Handle search by Enter key
inputfield.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const cityName = inputfield.value.trim();
    if (cityName !== "") {
      fetchApiData(cityName);
      inputfield.value = "";
      inputfield.blur();
    }
  }
});

