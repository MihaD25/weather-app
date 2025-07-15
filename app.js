import { ERROR_MESSAGES } from "./modules/config.js";
import * as ui from "./modules/ui-controller.js";
import * as service from "./modules/weather-service.js";
import { getCoords } from "./modules/location-service.js";
import {
  loadUserPreferences,
  saveUserPreferences,
} from "./modules/ui-controller.js";

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

const handleSearch = async (cityParam) => {
  const city = cityParam || ui.getCityInput();

  if (!isValidCity(city)) {
    ui.showError("Introdu un nume de oraș valid.");
    return;
  }

  ui.hideError();
  ui.showLoading();

  try {
    const prefs = loadUserPreferences();
    const data = await service.getCurrentWeatherWithFallback(
      city,
      prefs.unit,
      prefs.lang
    );

    ui.displayWeather(data);
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
    ui.clearInput();
  }
};

const handleLocationSearch = async () => {
  ui.hideError();
  ui.showLoading();

  try {
    const coords = await getCoords();
    const prefs = loadUserPreferences();
    const data = await service.getWeatherByCoords(
      coords.latitude,
      coords.longitude,
      prefs.unit,
      prefs.lang
    );

    ui.displayWeather(data);
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
};

const setupEventListeners = () => {
  ui.elements.searchBtn.addEventListener("click", handleSearch);
  ui.elements.locationBtn.addEventListener("click", handleLocationSearch);

  ui.elements.cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
  ui.elements.unitSelect.addEventListener("change", (e) => {
    const unit = e.target.value;
    const prefs = loadUserPreferences();
    saveUserPreferences(unit, prefs.lang);
    handleSearch(Cluj);
  });

  ui.elements.langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    const prefs = loadUserPreferences();
    saveUserPreferences(prefs.unit, lang);
    handleSearch(Cluj);
  });
};

const init = async () => {
  ui.showLoading();

  try {
    const prefs = loadUserPreferences();
    const data = await service.getCurrentWeather(
      "Cluj",
      prefs.unit,
      prefs.lang
    );

    ui.displayWeather(data);
  } catch (error) {
    ui.showError("Nu am putut obține datele meteo.");
  } finally {
    ui.hideLoading();
  }

  setupEventListeners();
};

init();
