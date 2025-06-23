import { MOCK_DATA } from "./config.js";

export const getCurrentWeather = async (city) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!city || city.trim().length === 0) {
      throw new Error("Nume oraș invalid");
    }

    const data = { ...MOCK_DATA };

    data.name = city;

    return data;
  } catch (error) {
    console.error("Eroare la getCurrentWeather:", error);
    throw new Error("Nu s-au putut obține datele meteo");
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (lat == null || lon == null) {
      throw new Error("Coordonate invalide.");
    }

    const data = { ...MOCK_DATA };

    data.name = `Lat: ${lat}, Lon: ${lon}`;

    return data;
  } catch (error) {
    console.error("Eroare la getWeatherByCoords:", error);
    throw new Error("Nu s-au putut obține datele meteo după coordonate");
  }
};
