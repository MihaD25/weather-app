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

/* // Testează în browser console
const YOUR_API_KEY = "91fbb4b66883261e2794db05a8d041d8";
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Oradea&appid=${YOUR_API_KEY}&units=metric`
)
  .then((response) => response.json())
  .then((data) => {
    console.log("API Response:", data);
    console.log("Temperature:", data.main.temp);
    console.log("Description:", data.weather[0].description);
    console.log("Icon code:", data.weather[0].icon);
  }); */
