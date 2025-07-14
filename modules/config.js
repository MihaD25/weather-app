export const CONFIG = {
  API_KEY: "91fbb4b66883261e2794db05a8d041d8",
  API_BASE_URL: "https://api.openweathermap.org/data/2.5/",
  DEFAULT_UNITS: "metric",
  DEFAULT_LANG: "ro",
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: "weather",
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: "Orașul nu a fost găsit. Introdu alt oraș.",
  NETWORK_ERROR: "Verifică conexiunea la internet.",
  PERMISSION_DENIED: "Permisiunea de locație a fost refuzată.",
  LOCATION_ERROR: "Nu am putut obține locația.",
  API_ERROR: "A apărut o eroare la preluarea datelor meteo.",
  INVALID_CITY: "Introdu un nume de oraș.",
  INVALID_COORDS: "Coordonatele GPS nu sunt valide.",
};
