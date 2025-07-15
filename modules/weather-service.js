import { mockWeatherData } from "./mock-data.js";
import { CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from "./config.js";

const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${CONFIG.API_BASE_URL}${endpoint}`);
  url.searchParams.set("appid", CONFIG.API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const makeRequest = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Orașul nu a fost găsit. Te rog încearcă altul.");
      } else if (response.status === 401) {
        throw new Error("Acces neautorizat. Verifică cheia API.");
      } else if (response.status === 500) {
        throw new Error(
          "Eroare la serverul meteo. Te rugăm să încerci mai târziu."
        );
      } else {
        throw new Error("A apărut o eroare la preluarea datelor meteo.");
      }
    }

    return await response.json();
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    throw error;
  }
};

export const getCurrentWeather = async (city, units, lang) => {
  if (!city || city.trim() === "") {
    throw new Error(ERROR_MESSAGES.INVALID_CITY);
  }

  const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, {
    q: city,
    units: units,
    lang: lang,
  });

  return await makeRequest(url);
};

export const getWeatherByCoords = async (lat, lon, units, lang) => {
  if (lat == null || lon == null) {
    throw new Error(ERROR_MESSAGES.INVALID_COORDS);
  }

  const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, {
    lat,
    lon,
    units: units,
    lang: lang,
  });

  return await makeRequest(url);
};

export const getCurrentWeatherWithFallback = async (city, units, lang) => {
  try {
    const data = await getCurrentWeather(city, units, lang);
    return data;
  } catch (error) {
    if (
      error.message === ERROR_MESSAGES.NETWORK_ERROR ||
      error.message === ERROR_MESSAGES.API_ERROR ||
      error.message.includes("API key invalid")
    ) {
      console.warn("Folosesc date mock din cauza:", error.message);
      return {
        ...mockWeatherData,
        isFallback: true,
        fallbackReason: error.message,
      };
    }
    throw error;
  }
};
