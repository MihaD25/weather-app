export const elements = {
  cityInput: document.querySelector("#city-input"),
  searchBtn: document.querySelector("#search-btn"),
  locationBtn: document.querySelector("#location-btn"),
  loading: document.querySelector("#loading"),
  error: document.querySelector("#error"),
  weatherDisplay: document.querySelector("#weather-display"),
  weatherIcon: document.querySelector("#weather-icon"),
  cityName: document.querySelector("#city-name"),
  temp: document.querySelector("#temperature"),
  description: document.querySelector("#weather-description"),
  humidity: document.querySelector("#humidity"),
  pressure: document.querySelector("#pressure"),
  wind: document.querySelector("#wind"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
};

export const showLoading = () => {
  elements.loading.classList.remove("hidden");
};

export const hideLoading = () => {
  elements.loading.classList.add("hidden");
};

export const showError = (message) => {
  elements.error.textContent = message;
  elements.error.classList.remove("hidden");
};

export const hideError = () => {
  elements.error.classList.add("hidden");
  elements.error.textContent = "";
};

export const getCityInput = () => {
  return elements.cityInput.value.trim();
};

export const clearInput = () => {
  elements.cityInput.value = "";
};

export const displayWeather = (data) => {
  hideError();

  elements.cityName.textContent = data.name;
  elements.temp.textContent = `${data.main.temp} °C`;
  elements.description.textContent = data.weather[0].description;
  elements.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  elements.weatherIcon.alt = data.weather[0].description;

  elements.humidity.textContent = `${data.main.humidity} %`;
  elements.pressure.textContent = `${data.main.pressure} hPa`;

  elements.wind.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

  const sunriseTime = new Date(data.sys.sunrise * 1000);
  const sunsetTime = new Date(data.sys.sunset * 1000);

  elements.sunrise.textContent = `${sunriseTime.getHours()}:${sunriseTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  elements.sunset.textContent = `${sunsetTime.getHours()}:${sunsetTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  elements.weatherDisplay.classList.remove("hidden");
};
