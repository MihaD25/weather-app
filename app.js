import("./modules/config.js").then((config) => {
  console.log("MOCK_DATA:", config.MOCK_DATA);
});

import * as ui from "./modules/ui-controller.js";
import * as service from "./modules/weather-service.js";

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

const handleSearch = async () => {
  const city = ui.getCityInput();

  if (!isValidCity(city)) {
    ui.showError("Introdu un nume de oraș valid.");
    return;
  }

  ui.hideError();
  ui.showLoading();

  try {
    const data = await service.getCurrentWeather(city);
    ui.displayWeather(data);
  } catch (error) {
    ui.showError("Nu am putut obține datele meteo.");
  } finally {
    ui.hideLoading();
    ui.clearInput();
  }
};

const handleLocationSearch = async () => {
  if (!navigator.geolocation) {
    ui.showError("Geolocația nu este suportată în browserul tău.");
    return;
  }

  ui.hideError();
  ui.showLoading();

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const data = await service.getWeatherByCoords(latitude, longitude);
        ui.displayWeather(data);
      } catch (error) {
        ui.showError("Nu am putut obține datele meteo.");
      } finally {
        ui.hideLoading();
      }
    },
    () => {
      ui.showError("Nu am putut obține locația.");
      ui.hideLoading();
    }
  );
};

const setupEventListeners = () => {
  ui.elements.searchBtn.addEventListener("click", handleSearch);
  ui.elements.locationBtn.addEventListener("click", handleLocationSearch);

  ui.elements.cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
};

const init = async () => {
  ui.showLoading();

  try {
    const data = await service.getCurrentWeather("Cluj");
    ui.displayWeather(data);
  } catch (error) {
    ui.showError("Nu am putut obține datele meteo.");
  } finally {
    ui.hideLoading();
  }

  setupEventListeners();
};

init();
